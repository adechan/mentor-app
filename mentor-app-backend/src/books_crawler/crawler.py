import functools
import json
import os.path
from pprint import pprint

import trio
import requests
from bs4 import BeautifulSoup
import re

from loguru import logger

base_url = 'https://www.goodreads.com/search?utf8=%E2%9C%93&q='
# https://www.goodreads.com/search?utf8=%E2%9C%93&q=painting+and+&search_type=books <- url example
numbers_pattern = r'([0-9][0-9,.]*)'

async def save_top_10_books(to_search):
    url = base_url + to_search + '+&search_type=books'
    for i in range(10):
        try:
            logger.debug(f'Crawling {to_search}')
            page = await trio.to_thread.run_sync(functools.partial(requests.get, url))
            try:
                books = parse_top_10_books(page.content)
                logger.trace(f'Writing {books=} to file...')
                await write_books_to_file(books, to_search.replace(' ', '_'))
                logger.debug(f'{to_search} crawler finished')
            except Exception as e:
                logger.exception(e)
            break
        except requests.exceptions.ConnectionError:
            logger.error(f'Connecion error, retrying attempt {i}...')
            await trio.sleep(10)

def parse_top_10_books(content: bytes):
    body = BeautifulSoup(content, "html.parser")

    content_div = body.find('div', {"class": "content"})
    main_content_container = content_div.find('div', {"class": "mainContentContainer"})

    table = main_content_container.find('table')
    rows = table.findAll('tr')

    books = []
    for row in rows:
        td_s = row.findAll('td')

        if len(td_s) >= 2:
            first_column = td_s[0]
            image = first_column.find('img')["src"]

            second_column = td_s[1]
            name = second_column.find('a').find('span').text
            author = second_column.find('a', {"class": "authorName"}).text

            avg_rating_text = second_column.find('span', {"class": "minirating"}).text
            numbers = re.findall(numbers_pattern, avg_rating_text)

            avg_rating = numbers[0]
            number_ratings = numbers[1]

            result = {
                "image": image,
                "book_name": name,
                "author_name": author,
                "avg_rating": float(avg_rating),
                "number_ratings": int(number_ratings.replace(',', ''))
            }
            books.append(result)

    books.sort(key=lambda book: book['avg_rating'], reverse=True)
    return books[:10]

async def write_books_to_file(books, interest: str):
    book_filename = f'crawled_books/{interest}-books.txt'
    if os.path.exists(book_filename) and os.path.getsize(book_filename) > 10:
        return

    async with await trio.open_file(f'crawled_books/{interest}-books.txt', 'w') as f:
        await f.write(json.dumps(books))

async def run_crawler(interests: list):
    # pprint(interests)
    async with trio.open_nursery() as n:
        for interest in interests:
            book_filename = f'crawled_books/{interest.replace(" ", "_")}-books.txt'
            if os.path.exists(book_filename) and os.path.getsize(book_filename) > 10:
                continue

            n.start_soon(functools.partial(save_top_10_books, interest))
            await trio.sleep(2)

def get_interests_from_db(db, api):
    interests = []
    course_row = db.session.query(api.Course) \
        .all()

    for row in course_row:
        interests.append(row.title)

    return interests

if __name__ == '__main__':
    trio.run(run_crawler)

import json

import requests
from bs4 import BeautifulSoup
import re

from loguru import logger

base_url = 'https://www.goodreads.com/search?utf8=%E2%9C%93&q='
# https://www.goodreads.com/search?utf8=%E2%9C%93&q=painting+and+&search_type=books <- url example
numbers_pattern = r'([0-9][0-9,.]*)'

def get_top_10_books(to_search):
    url = base_url + to_search + '+&search_type=books'
    page = requests.get(url)
    return parse_top_10_books(page.content)

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

def write_books_to_file(books):
    with open('file', 'w') as f:
        f.write(json.dumps(books))

# ALG FOR RECOMMENDATION


if __name__ == '__main__':
    get_top_10_books('cat')

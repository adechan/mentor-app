
import requests
from bs4 import BeautifulSoup

def get_a_tags_from_url(hobobies_url):
    page = requests.get(hobobies_url)
    body = BeautifulSoup(page.content, "html.parser")

    hobbies_divs = body.findAll("div", {"class": "div-col"})

    found_a_s = []
    for hobbies_div in hobbies_divs:
        ul = hobbies_div.find("ul")
        li_s = ul.findAll("li")

        for li in li_s:
            a_s = li.findAll("a")
            for a in a_s:
                found_a_s.append(a)

    return found_a_s

def parse_hobbies_url(hobbies_url):
    a_s = get_a_tags_from_url(hobbies_url)

    found_hobbies = []
    for a in a_s:
        title = a.get("title")
        if title is not None:
            found_hobbies.append(title)

    return found_hobbies

def parse_table_from_academic_url(academic_fields_url):
    page = requests.get(academic_fields_url)
    body = BeautifulSoup(page.content, "html.parser")

    academic_tables = body.findAll("table")

    fields = []
    for table in academic_tables:
        t_body = table.find("tbody")
        t_row = t_body.find("tr")
        t_columns = t_row.findAll("td")

        for td in t_columns:
            ul = td.find("ul")
            if ul:
                li_s = ul.findAll("li")
                for li in li_s:
                    a = li.find("a")
                    title = a.get("title")

                    if title is not None:
                        fields.append(title)

    return fields

def parse_divs_from_academic_url(academic_fields_url):
    fields = parse_hobbies_url(academic_fields_url)

    return fields

def parse_urls(hobbies_url, academic_fields_url):
    hobbies = parse_hobbies_url(hobbies_url)
    fields_from_table = parse_table_from_academic_url(academic_fields_url)
    fields_from_divs = parse_divs_from_academic_url(academic_fields_url)

    result = list(set(hobbies + fields_from_divs + fields_from_table))
    result.sort()

    return result

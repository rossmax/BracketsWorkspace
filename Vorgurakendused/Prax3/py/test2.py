#!/usr/bin/python
import cgi
import time
import datetime


print "Content-type: text/html"
print

print "<html><head><title>test2.py</title></head><body><h1>Hello,"

formdata = cgi.FieldStorage()


if formdata.has_key("name"):
  print formdata['name'].value

else:
  print "puudu"

print "</body>"

name = formdata['name'].value


f = open('login.txt', 'a')

f.write(name + '\t')

f.close()

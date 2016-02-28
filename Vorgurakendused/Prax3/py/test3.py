#!/usr/bin/python
import cgi
import cgitb; cgitb.enable()

form = cgi.FieldStorage()
name = form['name'].value

file = open('/tmp/login.txt','a')
file.write(name + '\t'')

file.close()

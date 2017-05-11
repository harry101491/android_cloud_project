#!/usr/bin/python

import sys

flag="-1"
prevKey="0"
pair=""
currKey="0"
openCases=0
totalCases=0
rate=0
for line in sys.stdin:
   line=line.strip()
   line=line.split('\t')
   currKey=line[0]
   currValue=line[1]
   if(flag== "-1"):
      prevKey=line[0]
      pair=line[1]
      totalCases=1
      line1=line[1].split(',')
      if(line1[8]=='Open' or line1[8]=='Assigned'):
         openCases = 1
      flag="1"
      continue
   if(prevKey==currKey):
      pair=pair+'||'+currValue
      if(line1[8]=='Open' or line1[8]=='Assigned'):
         openCases = openCases+1
      totalCases=totalCases+1
   else:
      rate=(openCases/totalCases)*100
      print "%s\t%s||%d" %(prevKey,pair,rate)
      prevKey=currKey
      pair=line[1]
      openCases=1
      totalCases=1
print "%s\t%s||%d" %(prevKey,pair,rate)
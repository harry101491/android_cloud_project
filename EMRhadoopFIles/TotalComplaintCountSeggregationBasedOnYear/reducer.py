#!/usr/bin/python

import sys

flag="-1"
prevKey="0"
currKey="0"
sum=0
sumN=0;
sumR=0;
sumO=0;
for line in sys.stdin:
   line=line.strip()
   line=line.split('\t')
   currKey=line[0]
   currValue=line[1].split(',')
   if(flag== "-1"):
      prevKey=line[0]
      sum=1;
      if(currValue[1] == '1'):
      	sumN=1;
      elif(currValue[2] == '1'):
      	sumR=1;
      else:
      	sumO=1;
      flag="1"
      continue
   if(prevKey==currKey):
      sum=sum+1
      if(currValue[1] == '1'):
      	sumN=sumN+1;
      elif(currValue[2] == '1'):
      	sumR=sumR+1;
      else:
      	sumO=sumO+1;
   else:
      print "%s\t%d,%d,%d,%d" %(prevKey,sum,sumN,sumR,sumO)
      prevKey=currKey
      sum=1
      sumN=0;
      sumR=0;
      sumO=0;
      if(currValue[1] == '1'):
      	sumN=1;
      elif(currValue[2] == '1'):
      	sumR=1;
      else:
      	sumO=1;
      
print "%s\t%d,%d,%d,%d" %(prevKey,sum,sumN,sumR,sumO)

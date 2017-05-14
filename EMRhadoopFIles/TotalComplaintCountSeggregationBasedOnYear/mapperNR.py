#!/usr/bin/python

import sys
import os


for line in sys.stdin:
	line = line.strip()
	if(len(line) != 0):
		line = line.split(',')
		if(len(line) == 54 and line[50]!='' and line[51]!='' and line[16]!='' and line[1]!=''):
			key= line[1][6:10];
			value= 1;
			value1= 0;
			value2= 0;
			value3= 0;
			if('Noise' in line[5]):
				value1=1;
			elif('Rodent' in line[5]):
				value2=1;
			else:
				value3=1;
			print key+"\t"+str(value)+','+str(value1)+','+str(value2)+','+str(value3);


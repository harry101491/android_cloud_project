#!/usr/bin/python

import sys
import os

##mapreduce_map_input_file = os.environ.get("mapreduce_map_input_file")

for line in sys.stdin:
	line = line.strip()
	if(len(line) != 0):
		line = line.split(',')
		if(len(line) == 54 and line[8]!=''):
			key= line[8]
			value= line[0]+','+line[1]+','+line[4]+','+line[5]+','+line[6]+','+line[7]+','+line[9]+','+line[10]+','+line[19]+','+line[50]+','+line[51]
			print key+"\t"+value


#android_cloud_project

Project Overview
Relocating within this New York City can be really hectic and stressful, especially when you are obscure about a particular neighborhood.
Knowledge of the community, local crimes, sanitation, noise levels during different times of a day is not readily available and requires 
quite a research. To avoid any surprises and sour experiences, we have decided to come up with an application that provides such 
information along with ratings of the neighborhoods, on users fingertips.

We have built an android application called ‘Know Your Neighborhood’ which will provide information about the crime rate, 
noise issues, rodent, insect infestation rate, restaurants and other social venues.

Technologies used: Android, Google Cloud DataStore, Amazon EMR, Hadoop, AWS ElasticSearch.

#Implementation

Analyzed the NYC 311 open data regarding crimes, noise, rodent, etc., using AWS EMR service, by running Map Reduce codes in the Hadoop cluster. 
This analysis help us determine the crimes happening in the neighborhoods and also, how the law and order is. 
The law and order was judged based on the number of open and closed cases made by the people. 

The output of the above analysis is stored in the S3 and eventually moved to Google Cloud Data Store as key value pairs. 
This allowed us to query this data and then same was populated in google maps, along with some stats
Records regarding the surrounding restaurants and happening venues (like music, jazz, blues and other social clubs, etc.), 
were fetched using the Yelp API and stored in the ElasticSearch Database. The same is then populated based on the users search.

Google authentication has been implemented for Sign In purposes.

A Bound service has been implemented in the android app for a client server architecture
which allows smooth exchange of data through the network without blocking the main UI Thread.
A grid like view has been created for users to have a user friendly experience with the app.
The Application was finally deployed in Google App Engine.

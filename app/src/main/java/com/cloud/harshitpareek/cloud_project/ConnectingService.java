package com.cloud.harshitpareek.cloud_project;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * Created by harshitpareek on 5/10/17.
 */

public class ConnectingService extends Service
{
    private final IBinder myBinder = new MyBinder();
    private String url_string = "http://samples.openweathermap.org/data/2.5/weather?q=London,uk";
    private final String TAG = "Inside Service";

    @Override
    public IBinder onBind(Intent in)
    {
        return myBinder;
    }

    // test method to find the current time of the
//    public String getCurrentTime() {
//        SimpleDateFormat dateFormat =
//                new SimpleDateFormat("HH:mm:ss MM/dd/yyyy", Locale.US);
//        return (dateFormat.format(new Date()));
//    }

    public void connectServer()
    {
        try
        {
            URL url = new URL(url_string);
            Log.d(TAG, "Inside the connect Server");

            // create HTTP URL Connection and getting the data
            URLConnection connection = url.openConnection();
            HttpURLConnection httpURLConnection = (HttpURLConnection)connection;

            int responseCode = httpURLConnection.getResponseCode();
            if(responseCode == HttpURLConnection.HTTP_OK)
            {
                InputStream in = httpURLConnection.getInputStream();
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(in, "UTF-8"));
                StringBuilder sb = new StringBuilder();
                String line;
                while((line = bufferedReader.readLine()) != null)
                {
                    sb.append(line);
                }
                //JSONObject object = new JSONObject(sb.toString());
                Log.d(TAG, sb.toString());
//                String st = "";
//                String data;
//                while((data = bufferedReader.readLine()) != null)
//                {
//                    st += data;
//                }
                // showing the data into the LogCat

                //Log.d(TAG, st);
            }
        }
        catch (MalformedURLException malFormeExe)
        {
            Log.e(TAG, "MalFormed url exception");
        }
        catch (IOException e)
        {
            Log.e(TAG, "IOException has occured");
        }
//        catch (JSONException jexc)
//        {
//            Log.e(TAG, "JSON Exception");
//        }
    }

    public class MyBinder extends Binder
    {
        ConnectingService getService()
        {
            return ConnectingService.this;
        }
    }
}

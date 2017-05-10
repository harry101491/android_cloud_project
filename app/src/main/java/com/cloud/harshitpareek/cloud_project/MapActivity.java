package com.cloud.harshitpareek.cloud_project;

import android.os.Bundle;
import android.provider.ContactsContract;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import android.view.View;

import com.google.android.gms.maps.*;
import com.google.android.gms.maps.model.*;
/**
 * Created by harshitpareek on 5/9/17.
 */

public class MapActivity extends AppCompatActivity implements OnMapReadyCallback, NavigationView.OnNavigationItemSelectedListener
{

    private Marker marker;
    private final String TAG = "Map Related";
    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.map_layout_main);

        MapFragment mapFragment = (MapFragment) getFragmentManager().findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        Toolbar tool = (Toolbar) findViewById(R.id.toolbar_map);
        setSupportActionBar(tool);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout_map);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, tool, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
    }

    @Override
    public void onMapReady(GoogleMap map)
    {
        // setting the info_window for the perticular icon

        if(map != null)
        {
            map.setInfoWindowAdapter(new GoogleMap.InfoWindowAdapter(){

                @Override
                public View getInfoWindow(Marker marker)
                {
                    return null;
                }

                @Override
                public View getInfoContents(Marker marker)
                {
                    // getting the view by inflating the layout
                    View v = getLayoutInflater().inflate(R.layout.info_window_layout, null);

                    // collecting the text view from the layout
                    ImageView info_window_img = (ImageView) v.findViewById(R.id.info_window_image);
                    TextView date = (TextView) v.findViewById(R.id.info_window_date);
                    TextView agency = (TextView) v.findViewById(R.id.info_window_agency);
                    TextView type = (TextView)v.findViewById(R.id.info_window_type);
                    TextView descriptor = (TextView)v.findViewById(R.id.info_window_descriptor);

                    String dateValue  = "5th April";
                    String agencyValue = "NYPD";
                    String typeValue = "Bed Bugs";
                    String desc = "Residential Building";
                    info_window_img.setImageResource(R.drawable.bug_icon);
                    date.setText("Date: "+dateValue);
                    agency.setText("Agency:"+agencyValue);
                    type.setText("Type:"+typeValue);
                    descriptor.setText("description:"+desc);

                    return v;
                }

            });
        }
        else
        {
            Toast.makeText(getApplicationContext(), "Map has not been initialized", Toast.LENGTH_SHORT).show();
            Log.e(TAG, "map object is not initialized");
        }

        LatLng newYork = new LatLng(40.7128, -74.0059);
        map.moveCamera(CameraUpdateFactory.newLatLngZoom(newYork, 12));

        if(marker != null)
        {
            marker.remove();
        }
        else
        {
            MarkerOptions options = new MarkerOptions()
                    .title("New York")
                    .icon(BitmapDescriptorFactory.fromResource(R.drawable.health_care_icon))
                    .position(newYork)
                    .snippet("The Big Apple");

            marker = map.addMarker(options);
        }


//        map.addMarker(new MarkerOptions()
//                .title("Sydney")
//                .snippet("The most populous city in Australia.")
//                .position(sydney));
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings){
            Toast.makeText(getApplicationContext(), "setting has been pressed", Toast.LENGTH_LONG).show();
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_camera) {
            // Handle the camera action
        } else if (id == R.id.nav_gallery) {

        } else if (id == R.id.nav_slideshow) {

        } else if (id == R.id.nav_manage) {

        } else if (id == R.id.nav_share) {

        } else if (id == R.id.nav_send) {

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
}

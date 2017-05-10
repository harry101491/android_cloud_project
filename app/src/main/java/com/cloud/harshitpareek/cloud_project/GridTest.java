package com.cloud.harshitpareek.cloud_project;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.AdapterView;
import android.widget.GridView;
import android.widget.Toast;
import android.view.View;


/**
 * Created by harshitpareek on 5/9/17.
 */

public class GridTest extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener
{
    private Tab[] tabs = {
            new Tab(R.string.map_label, R.drawable.map_image),
            new Tab(R.string.stats, R.drawable.stats_image),
            new Tab(R.string.yelp, R.drawable.yelp_photo),
            new Tab(R.string.home, R.drawable.home)
    };

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.grid_layout_main);

        GridView grid_view = (GridView) findViewById(R.id.app_grid);
        grid_view.setAdapter(new GridAdapter(this, tabs));
        grid_view.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView parent, View view, int position, long id)
            {
                Tab t = tabs[position];
                if(t.getName() == R.string.map_label)
                {
                    // Run the Map View with the Intent
                    Intent mapIntent = new Intent(getApplicationContext(), MapActivity.class);
                    // any data to add into the map intent
                    startActivity(mapIntent);
                }
                else if(t.getName() == R.string.stats)
                {
                    // Show the Stats View with Intent
                }
                else if(t.getName() == R.string.yelp)
                {
                    // handling of the click on the yelp
                }
                else if(t.getName() == R.string.home)
                {
                    // handling of the click at home
                }
            }
        });

        Toolbar tool = (Toolbar) findViewById(R.id.toolbar_grid);
        setSupportActionBar(tool);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout_grid);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, tool, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

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

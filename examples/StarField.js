/*
 * Copyright 2015-2017 WorldWind Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 *  Illustrates how to show the starfield layer above the globe, displaying a starry sky.
 *  This requires a dark background for the WorldWindow's canvas.
 */
requirejs([
        './WorldWindShim',
        './LayerManager'
    ],
    function (WorldWind,
              LayerManager) {
        'use strict';

        // Tell WorldWind to log only warnings and errors.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        // Create the WorldWindow.
        var wwd = new WorldWind.WorldWindow('canvasOne');

        // Create imagery layers.
        var BMNGOneImageLayer = new WorldWind.BMNGOneImageLayer();
        var BMNGLayer = new WorldWind.BMNGLayer();
        var starFieldLayer = new WorldWind.StarFieldLayer();
        var atmosphereLayer = new WorldWind.AtmosphereLayer();

        // Add previously created layers to the WorldWindow.
        wwd.addLayer(BMNGOneImageLayer);
        wwd.addLayer(BMNGLayer);
        wwd.addLayer(starFieldLayer); //IMPORTANT: add the starFieldLayer before the atmosphereLayer
        wwd.addLayer(atmosphereLayer);

        // Attach a time property to the starfield and atmosphere layers.
        var date = new Date();
        starFieldLayer.time = date;
        atmosphereLayer.time = date;

        var timeStamp = Date.now();

        // Animate the starry sky as well as the globe's day/night cycle with the atmosphere layer.
        function runDayCycleAnimation() {
                timeStamp += (60 * 1000); // Increase the time in the simulation by a minute.
                var date = new Date(timeStamp);
                starFieldLayer.time = date;
                atmosphereLayer.time = date;
            wwd.redraw(); // Update the WorldWindow.
            requestAnimationFrame(runDayCycleAnimation);
        }

        requestAnimationFrame(runDayCycleAnimation);

        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);
    });
var padding = {top:20, right:40, bottom:0, left:0},
            w = 500 - padding.left - padding.right,
            h = 500 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            picked = 100000,
            oldpick = [],
            color = d3.scale.category20();
           
        var data = [
                    {"label":"Dress Up…",  "value":1,  "question":"Just because you haven’t gone out in a while, doesn’t mean you can’t dress up. Change the cycle and bring some excitement by taking the time out to get “fancy.” Maybe even have a dress theme, or perhaps play some music and have a fashion show in front of your mirror. Don’t be afraid to strut your stuff in your favorite outfits around the house."}, 
                    {"label":"Virtual Tours",  "value":2,  "question":"Look into that place you’ve been thinking about for some time. See if they offer virtual tours. If so, share the screen during a Zoom call and explore the place. This can be done virtually, or if you can hop into a car and take a social distancing drive."}, 
                    {"label":"Cook Something New",  "value":3,  "question":"Try a new recipe and challenge yourself along the way. Compare your creations with others online, and share the virtual meal once you are done cooking. Not only do you get to enjoy cooking, but you get to have some fun eating too!"}, 
                    {"label":"Binge Watch a Show",  "value":4,  "question":"Grab your blanket and cuddle on the couch, you can still watch your favorite shows or the newest series. Virtually binge watch that show that you have been eyeing for a while. Depending on what you are using, you can screen share, or host a Netflix Party with your friends"}, 
                    {"label":"Movie Night",  "value":5,  "question":"You can virtually watch a movie together with your friends, by screen sharing or hosting a Netflix Party. If you can safely do so, you may even consider a Movie Drive In. Or, try investing in a projector and look at the stars, while having your own magical movie night in your very own backyard!"}, 
                    {"label":"Pajama Party",  "value":6,  "question":"Get dressed in your favorite, coziest pajamas and have a pajama party! If you can’t do this at home, you can do this virtually too. Maybe even have some fun playing your favorite games, watching a movie, or take turns telling stories with friends."}, 
                    {"label":"Arts and Crafts",  "value":7,  "question":"Spend some time crafting with your friends! Perhaps take turns drawing or painting each other. Or, create something fun together. To add some excitement, have a challenge, like a paint off. Or play a game. For example, play a guessing game, where one person draws something and the other has 10 seconds to guess it right."}, 
                    {"label":"Virtual Dance Party",  "value":8,  "question":"Don’t be so serious! Take a break and have some fun by having a virtual dance party. Create a fun, personalized playlist to set the mood right. Dance to the tunes and have a great time letting loose with your friends or even alone."}, 
                    {"label":"Game Nite",  "value":9,  "question":"Even if you aren’t in person,  you can still play some of your favorite games virtually! Don’t be afraid to build the excitement by creating a little competition with your friends, like having a special prize for the winner. It doesn’t need to be anything fancy, just for fun."}, 
                    {"label":"Spa Time", "value":10, "question":"Take a break and do something to relax! Try doing a facial, maybe doing your nails/hair, or whatever else you like to do for self-care."},
                    {"label":"Fun Workout",  "value":11, "question":"Have some fun by doing a virtual workout with your friends! One of you can lead, or you can all join a virtual class together. It can be a new dance style, some cardio, or even some yoga-whatever you enjoy. Don’t be afraid to step outside of your comfort zone and try something new"}, 
                    {"label":"Picnic",  "value":12,  "question":"If you can do so safely, have a picnic while social distancing. Bring some yummy snacks, perhaps a custom playlist. Pro tip: bring some blankets and pillows to get comfy. No fear though, you can still have an incredible picnic virtually! Enjoy a video call with friends and some yummy snacks, some good music, and talking or playing games."}, 
                    {"label":"Make Music",  "value":13,  "question":"Have some fun by doing a virtual music show with your friends! One of you can lead, or you can all join together and make a band. It can even be a new music instrument you’ve wanted to learn. Don’t be afraid to step outside of your comfort zone and try something new!"}, 
                    {"label":"Take a bath",  "value":14,  "question":"Take a break and do something to relax! Try to take a relaxing bath. For an added bonus consider setting the mood with some bubbles, candles or even some music!"}
        ];
        var svg = d3.select('#chart')
            .append("svg")
            .data([data])
            .attr("width",  w + padding.left + padding.right)
            .attr("height", h + padding.top + padding.bottom);
        var container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
        var vis = container
            .append("g");
            
        var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
        var arc = d3.svg.arc().outerRadius(r);
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");
            
        arcs.append("path")
            .attr("fill", function(d, i){ return color(i); })
            .attr("d", function (d) { return arc(d); });
        arcs.append("text").attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle)/2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
            })
            .attr("text-anchor", "end")
            .text( function(d, i) {
                return data[i].label;
            });
        container.on("click", spin);
        function spin(d){
            
            container.on("click", null);
            console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
            if(oldpick.length == data.length){
                console.log("done");
                container.on("click", null);
                return;
            }
            var  ps       = 360/data.length,
                 pieslice = Math.round(1440/data.length),
                 rng      = Math.floor((Math.random() * 1440) + 360);
                
            rotation = (Math.round(rng / ps) * ps);
            
            picked = Math.round(data.length - (rotation % 360)/ps);
            picked = picked >= data.length ? (picked % data.length) : picked;
            if(oldpick.indexOf(picked) !== -1){
                d3.select(this).call(spin);
                return;
            } else {
                oldpick.push(picked);
            }
            rotation += 90 - Math.round(ps/2);
            vis.transition()
                .duration(3000)
                .attrTween("transform", rotTween)
                .each("end", function(){
                    d3.select("#question h1")
                        .text(data[picked].question);
                    oldrotation = rotation;

                    console.log(data[picked].value)
                    container.on("click", spin);
                });
        }
        svg.append("g")
            .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
            .append("path")
            .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
            .style({"fill":"#c21e29"});
        container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 60)
            .style({"fill":"white","cursor":"pointer"});
        container.append("text")
            .attr("x", 0)
            .attr("y", 5)
            .attr("text-anchor", "middle")
            .text("Treat Yourself")
            .style({"font-weight":"bold", "font-size":"20px"});
            container.append("text")
            .attr("x", 0)
            .attr("y", 26)
            .attr("text-anchor", "middle")
            .text("<3")
            .style({"font-weight":"bold", "font-size":"20px"});
        
        
        function rotTween(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            return "rotate(" + i(t) + ")";
          };
        }
        
        
        function getRandomNumbers(){
            var array = new Uint16Array(1000);
            var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
            if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
                window.crypto.getRandomValues(array);
                console.log("works");
            } else {
                for(var i=0; i < 1000; i++){
                    array[i] = Math.floor(Math.random() * 100000) + 1;
                }
            }
            return array;
        }
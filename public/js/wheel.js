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
                    {"label":"Candlelit Dinner and Walk",  "value":1,  "question":"Social distancing doesn’t mean that you can’t order food from your favorite place(s), dim the lights, light some candles, and talk with your significant other. You can even do so over a video call! Don’t be afraid to end dinner by grabbing some fresh air and taking a nice walk outside."}, 
                    {"label":"Dress Up...",  "value":2,  "question":"Just because you haven’t gone out in a while, doesn’t mean you can’t dress up. Change the cycle and bring some excitement by taking the time out to get “fancy.” Maybe even have a dress theme, or perhaps play some music and have a fashion show for each other. Don’t be afraid to make your partner laugh or strut your stuff in your favorite outfits around the house."}, 
                    {"label":"Virtual Tours",  "value":3,  "question":"Look into that place your significant other has been gushing about for some time. See if they offer virtual tours. If so, share the screen during a Zoom call and explore the place together. Or, give a tour of your hometown. This can be done virtually too, or if you can hop into a car together and take a social distancing drive."}, 
                    {"label":"Cook Something New...Together!",  "value":4,  "question":"If you can’t cook together in person, try a new recipe and guide each other along the way, giving steps on video call or chat. Compare your creations together, and share the virtual meal once you are done cooking. Not only do you get to enjoy cooking together, but you get to have some fun eating too!"}, 
                    {"label":"Transport Food",  "value":5,  "question":"If you can safely bring food to your partner, drop off some food on their porch. It can be a home meal, some baked goods, dessert, or other treats. Not only will they appreciate their very own personal delivery, but you can both share the same food virtually, experiencing the same tastes and sharing each other’s company."}, 
                    {"label":"Binge Watch a Show",  "value":6,  "question":"If you can’t cuddle together on the couch, you can still watch your favorite shows or the newest series. Virtually binge watch that show that you both have been eyeing for a while. Depending on what you are using, you can screen share, or host a Netflix Party!"}, 
                    {"label":"Movie Night",  "value":7,  "question":"You can virtually watch a movie together, by screen sharing or hosting a Netflix Party. If you can safely do so, you may even consider a Movie Drive In, where you and your significant other can cuddle in the car, while social distancing from the other couples. Or, try investing in a projector and look at the stars, while having your own magical movie night in your very own backyard!"}, 
                    {"label":"Pajama Party",  "value":8,  "question":"Get dressed in your favorite, coziest pajamas and have a pajama party! If you can’t do this at home, you can do this virtually too. Maybe even have some fun playing your favorite games, watching a movie, or take turns telling stories"}, 
                    {"label":"Arts and Crafts",  "value":9,  "question":"Spend some time crafting with your partner! Perhaps take turns drawing or painting each other. Or, create something fun together. To add some excitement, have a challenge, like a paint off. Or play a game. For example, play a guessing game, where one person draws something and the other has 10 seconds to guess it right."}, 
                    {"label":"Virtual Dance Party", "value":10, "question":"Don’t be so serious! Take a break and have some fun by having a virtual dance party. Create a fun, personalized playlist to set the mood right. Both of you can dance to the tunes and have a great time letting loose with each other."},
                    {"label":"Game Nite",  "value":11, "question":"Even if you aren’t in person,  you can still play some of your favorite games virtually! Don’t be afraid to build the excitement by creating a little competition, like having a special prize for the winner. It doesn’t need to be anything fancy, just for fun. Also, try some games to learn more about each other, like Two Truths and a Lie, Truth or Dare, Never Have I Ever, 36 Questions, etc."}, 
                    {"label":"Spa Time",  "value":12,  "question":"Take a break and do something to relax! Try doing a facial, maybe doing your nails/hair, or whatever else you like to do for self-care. Join your partner virtually to share the good vibes and relaxation. If you can safely be in-person, try giving your partner a facial or massage to make it more personal."}, 
                    {"label":"Fun Workout ",  "value":13,  "question":"Have some fun by doing a virtual workout together! One of you can lead, or you can both join a virtual class together. It can be a new dance style, some cardio, or even some yoga-whatever you both enjoy. Don’t be afraid to step outside of your comfort zone and try something new together!"}, 
                    {"label":"Picnic",  "value":14,  "question":"If you can do so safely, have a romantic picnic while social distancing. Bring some yummy snacks, perhaps a custom playlist to set the mood, and maybe even some flowers or lights for decor. Pro tip: bring some blankets and pillows to get comfy. No fear though, you can still have an incredible picnic virtually! Enjoy a video call with some yummy snacks, some good music, and talking or playing games. "}
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
            .text("Perfect Date")
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
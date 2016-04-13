//3
var line = function (d1, d2, d3) {
    this.departure = d1;
    this.destination = d2;
    this.distance = d3;
};


//Find shortest route of 100 connections 
    //1  ask user to input two destinations.
    //1a  create needed variables. hardcoded length of file. ideally should have function to get File Length
    //2   open the CSV file data3
    //3   object for departure, destination, distance 
    //4   add all objects into an array or queue 
    //5   algorithms for graphs to finding shortest path: dijsktra. USING FOR LOOPS
    //6   print the distance for those location
var p4 =
[
    //var desiredDeparture =  prompt("Starting Process 4, First give me your Departure Location: ");
    [prompt, ["Starting Process 4, First give me your Departure Location: ", desiredDeparture]],
    //var desiredDestination =  prompt("Process 4, Second give me your Destination Location: ");
    [prompt, ["Process 4, Second give me your Destination Location: ", desiredDestination]],
    //1a
    [assign, ["totalDistance", 0]],
    [assign, ["endofFile", 100]],
    
    //2
    [open, ["data4", "r", "fp"]],

    //4
    [for, [i, endofFile, 1]],
      [call,[line, [fileIn, fileOut] ],

    [endFor],

    //5
    [for, [i, endofFile, 1]],
    [endFor],

    //6
    [print, ["Shortest Distance from " + desiredDeparture + "to" + desiredDestination + " is " + totalDistance]],
];








//destination1, destination2, distance
var data4 = [
    "destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance,
     destination1, destination2, distance"
];
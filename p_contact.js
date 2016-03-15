/**
 * Created by Maria
 * Manages a list of 50 contacts
 * Data generated from generatedata.com
 */

fs.data("contacts.csv",
    "Fuller,1-365-838-5378,Purranque"
+   "Jayme,1-735-831-8257,Fort St. John"
+   "Martina,1-890-933-6578,Vallepietra"
+   "Xavier,1-725-364-2767,Portland"
+   "Harriet,1-670-843-6718,Nizamabad"
+   "Hammett,1-396-225-0862,Langley"
+   "Candace,1-952-558-5293,Donnas"
+   "John,1-982-849-6841,Roccanova"
+   "Tanya,1-623-378-6878,Quinta Normal"
+   "Dustin,1-818-518-2352,Monte Vidon Corrado"
+   "Flynn,1-917-818-0504,Los Angeles"
+   "Russell,1-602-180-0598,Borås"
+   "Lydia,1-284-882-2251,Barrhead"
+   "Morgan,1-778-613-1551,Wenduine"
+   "Latifah,1-288-544-6405,Ghaziabad"
+   "Sebastian,1-687-818-8575,Aberdeen"
+   "Bianca,1-139-382-9246,Ospedaletto dAlpinolo"
+   "Jena,1-452-597-7820,MalŽves-Sainte-Marie-Wastines"
+   "Cameran,1-597-950-8913,Evansville"
+   "Stacy,1-855-377-1931,Latur"
+   "Warren,1-671-691-1869,Cache Creek"
+   "Devin,1-188-869-8172,Rosolini"
+   "Olga,1-212-471-7739,Chapecó"
+   "Samuel,1-664-887-3216,Celle"
+   "Kiona,1-942-432-5177,San Lorenzo"
+   "Regan,1-220-901-8698,Gönen"
+   "Hiroko,1-895-693-8601,Nicolosi"
+   "Yardley,1-841-974-6204,Bruderheim"
+   "Ocean,1-782-628-1454,Arquata del Tronto"
+   "McKenzie,1-848-232-2315,Hohenems"
+   "Blossom,1-384-301-0388,Cuccaro Vetere"
+   "Serina,1-106-743-3205,Phoenix"
+   "Christopher,1-625-264-9948,Genova"
+   "Elliott,1-402-709-8328,Cervino"
+   "Lee,1-861-127-2612,Gouda"
+   "Brody,1-602-171-2107,Isnes"
+   "Giacomo,1-662-407-5208,Cappelle sul Tavo"
+   "Azalia,1-685-234-3194,Eastbourne"
+   "Hakeem,1-470-952-3311,Ravensburg"
+   "Juliet,1-538-502-2742,Gavirate"
+   "Heidi,1-733-347-2481,Hunstanton"
+   "Hayfa,1-858-883-8341,Linkhout"
+   "Cheyenne,1-860-923-8736,Toernich"
+   "Chandler,1-129-261-0785,Mores"
+   "Rebekah,1-515-909-0718,Terme"
+   "Riley,1-370-210-4218,Ethe"
+   "Juliet,1-204-566-6616,Wick"
+   "Renee,1-110-302-5224,Hertsberge"
+   "Quon,1-299-743-0520,Oldenburg ")

//copies list of contacts to another file
function copyContacts(pcb, argv)
{
    File.copy("contacts.csv", "copyContacts.csv");
}

//read through file
function readContacts()
{
    var rowElements= 3;
    var allTextLines = allText.split(/\r\n|\n/);
    var entries = allTextLines[0].split(',');
    var lines = [];

    while (entries.length>0) {
        var temp = [];
        for (var j=0; j<rowElements; j++) {
            temp.push(entries.shift());
        }
        lines.push(temp);
    }

}

//hard coded contact of interest
function findLydia(pcb, argv)
{
    var allTextLines = allText.split(/\r\n|\n/);
    var entries = allTextLines[0].split(',');
    var name = "Lydia"

    for (i = 0; i < 50; i++)
    {
        if (entries[i] == name)
        {
            console.log("Contact found.");
        }
    }

}
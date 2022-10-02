
var roomName = "Room Name";
var maxPlayers = 10;
var roomPublic = false;
var playerName = "BOT";
var noPlayer = false; //false = Bot İs invisible - true = Bot İs Visible (False Recomended)
const geo = [
    { code: 'TR', lat: 40.9, lon: 29.1 },
    { code: 'FR', lat: 46.2, lon: 2.2 },
    { code: 'PL', lat: 51.9, lon: 19.1 },
    { code: 'GB', lat: 55.3, lon: -3.4 },
    { code: 'PT', lat: 39.3, lon: -8.2 },
];
var redTeam = ["","","","","",""];
var blueTeam = ["","","","","",""];
var auth;
var previousPositionsX = [];
var previousPositionsY = [];
var playerMoving = false;
var stats = [0,0,0,0,0,0,0,"name",0]// stats[0] = total games, stats[1] = wins, stats[2] = loses, stats[3] = goals, stats[4] = own goal, stats[5] = point, stats[6] = signed, stats[7] player.name, stats[8] = 0: noban - 1: banned
var ballOut2 = true;
var realMap = false;
var exitingPos = null;
var ballOut = true;
var redZero = undefined;
var blueZero = undefined;
var specZero = undefined;
var lastCall2;
var lastScores = 0;
var slowModeTime = 5;//slow chat mode time (seconds)
var backMSG = false;
var realMap2 = false;
var isLineUp = false;
var room = HBInit({ roomName: roomName, maxPlayers: maxPlayers, public: roomPublic, playerName: playerName, geo:geo[0],noPlayer:noPlayer });
var visible = "";
room.setTeamsLock(true);
room.setScoreLimit(0);
room.setTimeLimit(0);
var redStreak = 0;//win streak's of red team
var blueStreak = 0;//win streak's of blue team
var point = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
];
var lastCall;
var lastTeamTouched = 0;
var stadiumWidth = 1150;
var stadiumHeight = 600;
var radiusBall = 8;
var throwInLeeway = 350;
var greenLine = 510;

/* SETTINGS */

var triggerDistance = radiusBall + 15 + 0.01;
var outLineY = stadiumWidth - (radiusBall / 2) + 6;
stadiumWidth += (radiusBall / 2) + 6;
stadiumHeight += (radiusBall / 2) + 6;
var abuser = 0;
var lastPlayerTouched;
var ballSpeed;
var SlowMode = [];
var real = false;
var kickOff = false;
var playersAfk = {};
var afkPlayerIDs = new Set();
var afkListForChat = [];
var PlayerList = [];
var blockedWords = ["oç", "oc", "ananı sikeyim", "ananı", "sikim", "skim", "sikm", "skm", "annı", "piç", "pic", "pıc", "pç", "orospu", "oruspu", "orosbu", "orusbu", "göt", "got", "yarram", "yrrm", "yarrağım", "yarragım", "cocu", "amk", "pezevenk", "sik", "sikik", "sikerim", "sikeceğim", "siktiğim", "allahını", "allahsız", "puşt", "amık", "amcık", "taşşak", "taşak", "daşşak", "daşak", "sikeyim", "sikiyim", "siktir", "sikişek", "sikişelim", "orospunun", "orusbunun", "oruspunun", "orosbunun", "orospunun", "amını", "amcığını", "yarrağını", "götünü", "yarak", "yavşak", "avradini", "avradını", "bacını", "bacini", "siktigim", "siktiğim", "siktirlan", "yavsak", "gay", "lezbiyen", "travesti", "gavat", "sikkafa", "aminiyolunu", "fuck", "bitch", "porn", "porno", "sike", "amınakodum", "sikicem", "sikiş", "sik", "sikerler", "sikişik", "amına", "sikişken", "OÇ", "OC", "ANANı SİKEYİM", "AMI", "ANANI", "SİKİM", "SKİM", "SİKM", "SKM", "ANNı", "PİÇ", "PİC", "PİC", "PÇ", "OROSPU", "ORUSPU", "OROSBU", "ORUSBU", "GÖT", "GOT", "GT", "YARRAM", "YRRM", "YARRAĞIM", "YARRAGİM", "PEZEVENK", "SİK", "SİKİK", "SİKERİM", "SİKECEĞİM", "SİKTİĞİM", "ALLAHINI", "ATANI", "ALLAHSIZ", "PUŞT", "AMIK", "AMCIK", "TAŞŞAK", "TAŞAK", "DAŞŞAK", "DAŞAK", "SİKEYİM", "SİKİYİM", "SİKTİR", "SİKİŞEK", "SİKİŞELİM", "OROSPUNUN", "ORUSBUNUN", "ORUSPUNUN", "OROSBUNUN", "OROSPUNUN", "AMİNİ", "AMCİĞİNİ", "YARRAĞİNİ", "GÖTÜNÜ", "YARAK", "YAVŞAK", "AVRADİNİ", "AVRADİNİ", "BACİNİ", "BACİNİ", "SİKTİGİM", "SİKTİĞİM", "SİKTİRLAN", "YAVSAK", "TRAVESTİ", "GAVAT", "SİKKAFA", "AMİNİYOLUNU", "FUCK", "BİTCH", "PORN", "PORNO", "SİKE", "AMİNAKODUM", "SİKİCEM", "SİKİŞ", "SİK", "SİKERLER", "SİKİŞİK", "AMİNA", "SİKİŞKEN", "amın", "AMIN", "amcığın", "AMCIĞIN", "AMCIĞINIZI", "AMCIĞINI", "amcığınızı", "amcığını", "amcıklama", "amık", "AMIK", "evladı", "EVLADI", "amınakoyim", "AMINAKOYİM", "amınoğlu", "AMINOĞLU", "amina", "AMİNA", "amısına", "AMISINA", "ananın", "ANANIN", "ananisikerim", "ANANISİKERİM", "annenin", "ANNENİN", "ANNESİZ", "annesiz", "babanın", "BABANIN", "babanin", "BABANİN", "anan", "ANAN", "s1kerim", "S1KERİM", "s1kerım", "S1KERIM1", "0c", "0C", "oc", "OC", "OÇ", "oç", "0Ç", "0ç", "s.kyim", "S.KYİM", "S.KYIM", "s.kyım"];//Type here the words that you blocked like this  var blockedWords = ["word1","word2","word3"]
var adminPassword = 1000 + getRandomInt(9000);
console.log("Admin Password : " + adminPassword);
var Team = {
    SPECTATORS: 0,
    RED: 1,
    BLUE: 2
};

//Webhoooks
var chatLogWebhookURL = "";//webhookUrl for sned chat logs to discord (Should Be A Private Discord Channel)
var adminWebhookURL = "";//webhookurl to sending call for admins (Should Be A Private Discord Channel)
var sendBanWebhookUrl = "";//for sending ban logs to a discord channel(Can Be Private/Public [i Recomend Public])
var sendRecWebhookURL = "";//webhookurl for sending match records to a discord channel(Should Be A Public Discord Channel)
var sendLinkWebhookURL = "";//when you started to host the room, with this webhookurl it will send room link to a discord channel
//colors for "sendAnnouncement"
var colors = {
    red: 0xff0000,
    blue:0x0000ff,
    orange: 0xFF7F00,
    pink:0xFFCBDB,
    purple:0x660099,
    yellow:0xffff00,
    green:0x008000,
    white:0xffffff,
    brown:0x654321
}
var mapone = ``;
var maptwo = `.`;
var mapthree= `.`;
var mapMiniRealSoccer=`
{

	"name" : "Mɪɴɪ Rs v3 v4",

	"width" : 940,

	"height" : 380,

	"spawnDistance" : 350,

	"bg" : { "type" : "hockey", "width" : 700, "height" : 320, "kickOffRadius" : 80, "cornerRadius" : 0 },

	"playerPhysics" : {
		"bCoef" : 0.1,
		"invMass" : 0.7,
		"acceleration" : 0.11,
		"kickingAcceleration" : 0.05,
		"kickStrength" : 5.67

	},

	"ballPhysics" : {
		"radius" : 9.9,
		"bCoef" : 0.5,
		"invMass" : 1,
		"damping" : 0.99,
		"color" : "FFDD00",
		"cMask" : [ "all"
		],
		"cGroup" : [ "ball"
		]

	},

	"vertexes" : [
		/* 0 */ { "x" : 700, "y" : 206, "trait" : "line", "color" : "FFDD00" },
		/* 1 */ { "x" : 491, "y" : 206, "trait" : "line", "color" : "FFDD00" },
		/* 2 */ { "x" : 700, "y" : -206, "trait" : "line", "color" : "FFDD00" },
		/* 3 */ { "x" : 491, "y" : -206, "trait" : "line", "color" : "FFDD00" },
		/* 4 */ { "x" : 700, "y" : 125, "trait" : "line", "color" : "004DFF" },
		/* 5 */ { "x" : 614, "y" : 125, "trait" : "line", "color" : "004DFF" },
		/* 6 */ { "x" : 700, "y" : -125, "trait" : "line", "color" : "004DFF" },
		/* 7 */ { "x" : 614, "y" : -125, "trait" : "line", "color" : "004DFF" },
		/* 8 */ { "x" : 491, "y" : -90, "trait" : "line", "curve" : -130, "color" : "004DFF" },
		/* 9 */ { "x" : 491, "y" : 79, "trait" : "line", "curve" : -130, "color" : "004DFF" },
		/* 10 */ { "x" : -700, "y" : -206, "trait" : "line", "color" : "FFDD00" },
		/* 11 */ { "x" : -491, "y" : -206, "trait" : "line", "color" : "FFDD00" },
		/* 12 */ { "x" : -700, "y" : 206, "trait" : "line", "color" : "FFDD00" },
		/* 13 */ { "x" : -491, "y" : 206, "trait" : "line", "color" : "FFDD00" },
		/* 14 */ { "x" : -700, "y" : -125, "trait" : "line", "color" : "F00000" },
		/* 15 */ { "x" : -614, "y" : -125, "trait" : "line", "color" : "F00000" },
		/* 16 */ { "x" : -700, "y" : 125, "trait" : "line", "color" : "F00000" },
		/* 17 */ { "x" : -614, "y" : 125, "trait" : "line", "color" : "F00000" },
		/* 18 */ { "x" : -491, "y" : 85, "trait" : "line", "curve" : -130, "color" : "F00000" },
		/* 19 */ { "x" : -491, "y" : -89, "trait" : "line", "curve" : -130, "color" : "F00000" },
		/* 20 */ { "x" : 556, "y" : 4.5, "trait" : "line", "color" : "2e2604" },
		/* 21 */ { "x" : 556, "y" : -4.5, "trait" : "line", "color" : "2e2604" },
		/* 22 */ { "x" : -553, "y" : 4.5, "trait" : "line", "color" : "2e2604" },
		/* 23 */ { "x" : -553, "y" : -4.5, "trait" : "line", "color" : "2e2604" },
		
		/* 24 */ { "x" : -700, "y" : -320, "bCoef" : 2, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 25 */ { "x" : -700, "y" : -386, "cMask" : ["ball" ], "vis" : false },
		/* 26 */ { "x" : -700, "y" : -320, "bCoef" : 2, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 27 */ { "x" : -700, "y" : -386, "cMask" : ["ball" ], "vis" : false },
		/* 28 */ { "x" : 700, "y" : -320, "bCoef" : 2, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 29 */ { "x" : 700, "y" : -390, "cMask" : ["ball" ], "vis" : false },
		/* 30 */ { "x" : 700, "y" : 390, "bCoef" : 2, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 31 */ { "x" : 700, "y" : 320, "cMask" : ["ball" ], "vis" : false },
		/* 32 */ { "x" : -700, "y" : 390, "bCoef" : 2, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 33 */ { "x" : -700, "y" : 320, "cMask" : ["ball" ], "vis" : false },
		/* 34 */ { "x" : -969, "y" : -123, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 35 */ { "x" : -822, "y" : -124, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 36 */ { "x" : -822, "y" : 123, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 37 */ { "x" : -967, "y" : 123, "bCoef" : 0, "cMask" : ["blue" ] },
		
		/* 38 */ { "x" : -969, "y" : -123, "trait" : "kickOffBarrier" },
		/* 39 */ { "x" : -822, "y" : -123, "trait" : "kickOffBarrier" },
		/* 40 */ { "x" : -822, "y" : 123, "trait" : "kickOffBarrier" },
		/* 41 */ { "x" : -969, "y" : 123, "trait" : "kickOffBarrier" },
		
		/* 42 */ { "x" : -909, "y" : -83, "bCoef" : 0, "cMask" : ["blue" ], "color" : "2257D2" },
		/* 43 */ { "x" : -909, "y" : 77, "bCoef" : 0, "cMask" : ["blue" ], "color" : "2257D2" },
		/* 44 */ { "x" : -914, "y" : -83, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 45 */ { "x" : -904, "y" : -83, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 46 */ { "x" : -914, "y" : 77, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 47 */ { "x" : -904, "y" : 77, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 48 */ { "x" : -959, "y" : -83, "bCoef" : 0, "cMask" : ["red" ] },
		/* 49 */ { "x" : -959, "y" : 77, "bCoef" : 0, "cMask" : ["red" ] },
		/* 50 */ { "x" : 969, "y" : -123, "bCoef" : 0, "cMask" : ["red" ] },
		/* 51 */ { "x" : 822, "y" : -123, "bCoef" : 0, "cMask" : ["red" ] },
		/* 52 */ { "x" : 822, "y" : 123, "bCoef" : 0, "cMask" : ["red" ] },
		/* 53 */ { "x" : 969, "y" : 123, "bCoef" : 0, "cMask" : ["red" ] },
		
		/* 54 */ { "x" : 969, "y" : -123, "trait" : "kickOffBarrier" },
		/* 55 */ { "x" : 823, "y" : -123, "trait" : "kickOffBarrier" },
		/* 56 */ { "x" : 822, "y" : 123, "trait" : "kickOffBarrier" },
		/* 57 */ { "x" : 969, "y" : 123, "trait" : "kickOffBarrier" },
		
		/* 58 */ { "x" : 911, "y" : -90, "bCoef" : 0, "cMask" : ["red" ], "color" : "FF2121" },
		/* 59 */ { "x" : 911, "y" : 70, "bCoef" : 0, "cMask" : ["red" ], "color" : "FF2121" },
		/* 60 */ { "x" : 916, "y" : -90, "bCoef" : 0, "cMask" : ["red" ] },
		/* 61 */ { "x" : 906, "y" : -90, "bCoef" : 0, "cMask" : ["red" ] },
		/* 62 */ { "x" : 916, "y" : 70, "bCoef" : 0, "cMask" : ["red" ] },
		/* 63 */ { "x" : 906, "y" : 70, "bCoef" : 0, "cMask" : ["red" ] },
		/* 64 */ { "x" : 961, "y" : -90, "bCoef" : 0, "cMask" : ["blue" ] },
		/* 65 */ { "x" : 961, "y" : 70, "bCoef" : 0, "cMask" : ["blue" ] },
		
		/* 66 */ { "x" : -720, "y" : 236, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "FFDD00" },
		/* 67 */ { "x" : -720, "y" : 152, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "FFDD00" },
		/* 68 */ { "x" : -720, "y" : -152, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "FFDD00" },
		/* 69 */ { "x" : -720, "y" : -236, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "FFDD00" },
		/* 70 */ { "x" : 720, "y" : -236, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "FFDD00" },
		/* 71 */ { "x" : 720, "y" : -152, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "FFDD00" },
		/* 72 */ { "x" : 720, "y" : 152, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "FFDD00" },
		/* 73 */ { "x" : 720, "y" : 236, "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "FFDD00" },
		/* 74 */ { "x" : -700, "y" : 83.5, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "F00000", "curve" : 0 },
		/* 75 */ { "x" : -760, "y" : 82, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "F00000", "vis" : false, "curve" : 12 },
		/* 76 */ { "x" : -700, "y" : -83.5, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "F00000", "curve" : 0 },
		/* 77 */ { "x" : -760, "y" : -82, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "F00000", "vis" : false, "curve" : 12 },
		/* 78 */ { "x" : -760, "y" : 82, "trait" : "line", "color" : "ffffff" },
		/* 79 */ { "x" : -760, "y" : -82, "trait" : "line", "color" : "ffffff" },
		/* 80 */ { "x" : -760, "y" : 82, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "line", "color" : "FFF7F7", "vis" : true, "curve" : 10 },
		/* 81 */ { "x" : -760, "y" : -82, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "line", "color" : "FFF7F7", "vis" : true, "curve" : 10 },
		/* 82 */ { "x" : 703.01261034953, "y" : -83.5, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "004DFF", "curve" : 0 },
		/* 83 */ { "x" : 761, "y" : -82, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "004DFF", "vis" : false, "curve" : 12 },
		/* 84 */ { "x" : 701, "y" : 83.5, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "004DFF", "curve" : 0 },
		/* 85 */ { "x" : 761, "y" : 82, "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "line", "color" : "004DFF", "vis" : false, "curve" : 12 },
		/* 86 */ { "x" : 761, "y" : -82, "trait" : "line", "color" : "ffffff" },
		/* 87 */ { "x" : 761, "y" : 82, "trait" : "line", "color" : "ffffff" },
		/* 88 */ { "x" : 761, "y" : -82, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "line", "color" : "FFF7F7", "vis" : true, "curve" : 10 },
		/* 89 */ { "x" : 761, "y" : 82, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "line", "color" : "FFF7F7", "vis" : true, "curve" : 10 },
		
		/* 90 */ { "x" : 0, "y" : -80, "cMask" : ["red" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "color" : "585757", "vis" : false, "curve" : 0 },
		/* 91 */ { "x" : 0, "y" : -390, "trait" : "kickOffBarrier", "color" : "585757", "vis" : false, "curve" : 0 },
		/* 92 */ { "x" : -1, "y" : 390, "cMask" : ["red" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "color" : "585757", "vis" : false, "curve" : 0 },
		/* 93 */ { "x" : 0, "y" : 80, "trait" : "kickOffBarrier", "color" : "585757", "vis" : false, "curve" : 0 },
		
		/* 94 */ { "x" : -491, "y" : -206, "trait" : "line", "color" : "FFDD00" },
		/* 95 */ { "x" : -491, "y" : 206, "trait" : "line", "color" : "FFDD00" },
		/* 96 */ { "x" : 491, "y" : 206, "trait" : "line", "color" : "FFDD00" },
		/* 97 */ { "x" : 491, "y" : -206, "trait" : "line", "color" : "FFDD00" },
		/* 98 */ { "x" : -700, "y" : 320, "trait" : "line", "color" : "FFDD00" },
		/* 99 */ { "x" : -700, "y" : -320, "trait" : "line", "color" : "FFDD00" },
		/* 100 */ { "x" : 700, "y" : 320, "trait" : "line", "color" : "FFDD00" },
		/* 101 */ { "x" : 700, "y" : -320, "trait" : "line", "color" : "FFDD00" },
		
		/* 102 */ { "x" : 0, "y" : 81, "trait" : "kickOffBarrier", "color" : "fcfcfc", "vis" : false },
		
		/* 103 */ { "x" : 0, "y" : -5, "trait" : "line", "color" : "FFDD00" },
		/* 104 */ { "x" : 0, "y" : 3, "trait" : "line", "color" : "FFDD00" },
		/* 105 */ { "x" : 0, "y" : -5, "trait" : "line", "color" : "FFDD00" },
		/* 106 */ { "x" : 0, "y" : 3, "trait" : "line", "color" : "FFDD00" },
		
		/* 107 */ { "x" : -30, "y" : -49, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "curve" : 0 },
		/* 108 */ { "x" : -30, "y" : 34, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "curve" : 0 },
		/* 109 */ { "x" : 30, "y" : -49, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 0 },
		/* 110 */ { "x" : 30, "y" : 34, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 0, "color" : "FFFFFF" },
		/* 111 */ { "x" : 80.5, "y" : 3, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "color" : "eec215", "vis" : true, "curve" : 12 },
		/* 112 */ { "x" : -80.5, "y" : 4, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "color" : "eec215", "vis" : true, "curve" : -12 },
		/* 113 */ { "x" : 72, "y" : 34, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "curve" : -160.5, "vis" : true, "color" : "eec215" },
		/* 114 */ { "x" : -72, "y" : 35, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "curve" : -160.5, "vis" : true, "color" : "eec215" },
		/* 115 */ { "x" : 78.8, "y" : -19, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "color" : "eec215", "vis" : true, "curve" : 12 },
		/* 116 */ { "x" : -78.8, "y" : -18, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "color" : "eec215", "vis" : true, "curve" : -12 },
		/* 117 */ { "x" : 63, "y" : -49, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "curve" : 154, "vis" : true, "color" : "eec215" },
		/* 118 */ { "x" : -64, "y" : -49, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "curve" : 154, "vis" : true, "color" : "eec215" },
		/* 119 */ { "x" : 63, "y" : -49, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 0, "vis" : true, "color" : "004dff" },
		/* 120 */ { "x" : 72, "y" : 34, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 0, "vis" : true, "color" : "004dff" },
		/* 121 */ { "x" : -64, "y" : -49, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "curve" : 0, "vis" : true, "color" : "f73131" },
		/* 122 */ { "x" : -72, "y" : 35, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "curve" : 0, "vis" : true, "color" : "f73131" },
		/* 123 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "vis" : true, "color" : "FFDD00" },
		/* 124 */ { "x" : 0, "y" : -320, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "vis" : true, "color" : "FFDD00" },
		/* 125 */ { "x" : 0, "y" : 320, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "vis" : true, "color" : "FFDD00" },
		/* 126 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "vis" : true, "color" : "FFDD00" },
		
		/* 127 */ { "x" : 0, "y" : -80, "trait" : "line", "color" : "FFDD00" },
		/* 128 */ { "x" : 0, "y" : 80, "trait" : "line", "color" : "FFDD00" },
		/* 129 */ { "x" : -700, "y" : 294, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 130 */ { "x" : -675, "y" : 320, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 131 */ { "x" : -672.85422349049, "y" : -320, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 132 */ { "x" : -700, "y" : -295.14627021274, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 133 */ { "x" : 671.84288219525, "y" : 320, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 134 */ { "x" : 700, "y" : 294.15582349306, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 135 */ { "x" : 700, "y" : -293.03342928015, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 136 */ { "x" : 673.92337307118, "y" : -320, "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line", "color" : "FFDD00" },
		/* 137 */ { "x" : -712, "y" : -318, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		/* 138 */ { "x" : -740, "y" : -298, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		/* 139 */ { "x" : -740, "y" : 298, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		/* 140 */ { "x" : -712, "y" : 318, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		/* 141 */ { "x" : 712, "y" : 318, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		/* 142 */ { "x" : 740, "y" : 298, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		/* 143 */ { "x" : 740, "y" : -298, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		/* 144 */ { "x" : 712, "y" : -318, "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 45, "color" : "FFDD00" },
		
		/* 145 */ { "x" : 761, "y" : -82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 146 */ { "x" : 777, "y" : -82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 147 */ { "x" : 761, "y" : 82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 148 */ { "x" : 778, "y" : 82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 149 */ { "x" : -760, "y" : -82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 150 */ { "x" : -776, "y" : -82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 151 */ { "x" : -776, "y" : 82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 152 */ { "x" : -760, "y" : 82, "bCoef" : 1.1, "cMask" : ["ball" ], "vis" : false, "curve" : 0 },
		/* 153 */ { "x" : -700, "y" : -320, "bCoef" : 1.2, "cMask" : ["ball" ], "curve" : 0, "color" : "222223" },
		/* 154 */ { "x" : 700, "y" : -320, "bCoef" : 1.2, "cMask" : ["ball" ], "curve" : 0, "color" : "222223" },
		/* 155 */ { "x" : -700, "y" : 320, "bCoef" : 1.2, "cMask" : ["ball" ], "curve" : 0, "color" : "222223" },
		/* 156 */ { "x" : 700, "y" : 320, "bCoef" : 1.2, "cMask" : ["ball" ], "curve" : 0, "color" : "222223" },
		/* 157 */ { "x" : -682, "y" : -323, "bCoef" : -5, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 158 */ { "x" : -682, "y" : -389, "bCoef" : -5, "cMask" : ["ball" ], "vis" : false },
		/* 159 */ { "x" : -682, "y" : 390, "bCoef" : -5, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 160 */ { "x" : -682, "y" : 324, "bCoef" : -5, "cMask" : ["ball" ], "vis" : false },
		/* 161 */ { "x" : 682, "y" : 325.00001268704, "bCoef" : -5, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 162 */ { "x" : 682, "y" : 390.99998652002, "bCoef" : -5, "cMask" : ["ball" ], "vis" : false },
		/* 163 */ { "x" : 682, "y" : -389.99998731296, "bCoef" : -5, "cMask" : ["ball" ], "color" : "FFFFFF", "vis" : false },
		/* 164 */ { "x" : 682, "y" : -324.00001347998, "bCoef" : -5, "cMask" : ["ball" ], "vis" : false }

	],

	"segments" : [
		{ "v0" : 0, "v1" : 1, "color" : "FFDD00", "trait" : "line", "y" : 206 },
		{ "v0" : 1, "v1" : 3, "color" : "e9cc6e", "trait" : "line", "x" : 840 },
		{ "v0" : 2, "v1" : 3, "color" : "FFDD00", "trait" : "line", "y" : -206 },
		{ "v0" : 4, "v1" : 5, "color" : "004DFF", "trait" : "line", "y" : 150 },
		{ "v0" : 5, "v1" : 7, "color" : "FFDD00", "trait" : "line", "x" : 1030 },
		{ "v0" : 6, "v1" : 7, "color" : "004DFF", "trait" : "line", "y" : -150 },
		{ "v0" : 8, "v1" : 9, "curve" : -130, "color" : "004DFF", "trait" : "line", "x" : 840 },
		{ "v0" : 10, "v1" : 11, "color" : "FFDD00", "trait" : "line", "y" : -206 },
		{ "v0" : 11, "v1" : 13, "color" : "e9cc6e", "trait" : "line", "x" : -840 },
		{ "v0" : 12, "v1" : 13, "color" : "FFDD00", "trait" : "line", "y" : 206 },
		{ "v0" : 14, "v1" : 15, "color" : "F00000", "trait" : "line", "y" : -150 },
		{ "v0" : 15, "v1" : 17, "color" : "FFDD00", "trait" : "line", "x" : -1030 },
		{ "v0" : 16, "v1" : 17, "color" : "F00000", "trait" : "line", "y" : 150 },
		{ "v0" : 18, "v1" : 19, "curve" : -130, "color" : "F00000", "trait" : "line", "x" : -491 },
		{ "v0" : 20, "v1" : 21, "curve" : -180, "color" : "2e2604", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : -180, "color" : "2e2604", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "curve" : 180, "color" : "2e2604", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : 180, "color" : "2e2604", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "curve" : 90, "color" : "2e2604", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : 90, "color" : "2e2604", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "curve" : -90, "color" : "2e2604", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "curve" : -90, "color" : "2e2604", "trait" : "line", "x" : -935 },
		{ "v0" : 20, "v1" : 21, "color" : "2e2604", "trait" : "line", "x" : 935 },
		{ "v0" : 22, "v1" : 23, "color" : "2e2604", "trait" : "line", "x" : -935 },
		
		{ "v0" : 25, "v1" : 24, "curve" : 10, "vis" : false, "color" : "FFFFFF", "cMask" : ["ball" ] },
		{ "v0" : 27, "v1" : 26, "curve" : 10, "vis" : false, "color" : "FFFFFF", "cMask" : ["ball" ] },
		{ "v0" : 29, "v1" : 28, "curve" : 10, "vis" : false, "color" : "FFFFFF", "cMask" : ["ball" ] },
		{ "v0" : 31, "v1" : 30, "curve" : 10, "vis" : false, "color" : "FFFFFF", "cMask" : ["ball" ] },
		{ "v0" : 33, "v1" : 32, "curve" : 10, "vis" : false, "color" : "FFFFFF", "cMask" : ["ball" ] },
		{ "v0" : 34, "v1" : 35, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ] },
		{ "v0" : 35, "v1" : 36, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ] },
		{ "v0" : 36, "v1" : 37, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ] },
		
		{ "v0" : 38, "v1" : 39, "trait" : "kickOffBarrier" },
		{ "v0" : 40, "v1" : 41, "trait" : "kickOffBarrier" },
		
		{ "v0" : 42, "v1" : 43, "color" : "2257D2", "bCoef" : 1000000, "cMask" : ["blue" ] },
		{ "v0" : 44, "v1" : 45, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ] },
		{ "v0" : 46, "v1" : 47, "vis" : false, "bCoef" : 0, "cMask" : ["blue" ] },
		{ "v0" : 48, "v1" : 49, "vis" : false, "bCoef" : 1000000, "cMask" : ["red" ] },
		{ "v0" : 50, "v1" : 51, "vis" : false, "bCoef" : 0, "cMask" : ["red" ] },
		{ "v0" : 51, "v1" : 52, "vis" : false, "bCoef" : 0, "cMask" : ["red" ] },
		{ "v0" : 52, "v1" : 53, "vis" : false, "bCoef" : 0, "cMask" : ["red" ] },
		
		{ "v0" : 54, "v1" : 55, "trait" : "kickOffBarrier" },
		{ "v0" : 56, "v1" : 57, "trait" : "kickOffBarrier" },
		
		{ "v0" : 58, "v1" : 59, "color" : "FF2121", "bCoef" : 1000000, "cMask" : ["red" ] },
		{ "v0" : 60, "v1" : 61, "vis" : false, "bCoef" : 0, "cMask" : ["red" ] },
		{ "v0" : 62, "v1" : 63, "vis" : false, "bCoef" : 0, "cMask" : ["red" ] },
		{ "v0" : 64, "v1" : 65, "vis" : false, "bCoef" : 1000000, "cMask" : ["blue" ] },
		
		{ "v0" : 66, "v1" : 67, "curve" : -40, "vis" : true, "color" : "FFDD00", "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "x" : -720 },
		{ "v0" : 68, "v1" : 69, "curve" : -40, "vis" : true, "color" : "FFDD00", "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "x" : -730 },
		{ "v0" : 70, "v1" : 71, "curve" : -40, "vis" : true, "color" : "FFDD00", "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "x" : 720 },
		
		{ "v0" : 75, "v1" : 77, "curve" : 12, "vis" : false, "color" : "FFFFFF", "cMask" : ["ball" ], "trait" : "reargoalNetleft", "x" : -760 },
		
		{ "v0" : 74, "v1" : 75, "curve" : 0, "color" : "F00000", "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "sidegoalNet" },
		{ "v0" : 76, "v1" : 77, "curve" : 0, "color" : "F00000", "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "sidegoalNet" },
		
		{ "v0" : 80, "v1" : 81, "curve" : 10, "vis" : true, "color" : "FFF7F7", "cMask" : ["ball" ], "trait" : "reargoalNetleft", "x" : -760 },
		{ "v0" : 83, "v1" : 85, "curve" : 12, "vis" : false, "color" : "FFFFFF", "cMask" : ["ball" ], "trait" : "reargoalNetleft", "x" : 760 },
		
		{ "v0" : 82, "v1" : 83, "curve" : 0, "color" : "004DFF", "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "sidegoalNet" },
		{ "v0" : 84, "v1" : 85, "curve" : 0, "color" : "004DFF", "bCoef" : 1.1, "cMask" : ["ball","red","blue" ], "trait" : "sidegoalNet" },
		
		{ "v0" : 88, "v1" : 89, "curve" : 10, "vis" : true, "color" : "FFF7F7", "cMask" : ["ball" ], "trait" : "reargoalNetleft", "x" : 760 },
		
		{ "v0" : 90, "v1" : 91, "curve" : 0, "vis" : false, "color" : "585757", "trait" : "kickOffBarrier", "x" : 0 },
		{ "v0" : 92, "v1" : 93, "curve" : 0, "vis" : false, "color" : "585757", "trait" : "kickOffBarrier", "x" : 0 },
		
		{ "v0" : 94, "v1" : 95, "color" : "FFDD00", "trait" : "line", "x" : -840 },
		{ "v0" : 96, "v1" : 97, "color" : "FFDD00", "trait" : "line", "x" : 840 },
		{ "v0" : 98, "v1" : 99, "vis" : true, "color" : "FFDD00", "trait" : "line" },
		{ "v0" : 100, "v1" : 101, "vis" : true, "color" : "FFDD00", "trait" : "line" },
		{ "v0" : 103, "v1" : 104, "curve" : -180, "color" : "FFDD00", "trait" : "line" },
		{ "v0" : 105, "v1" : 106, "curve" : 180, "color" : "FFDD00", "trait" : "line" },
		{ "v0" : 103, "v1" : 104, "curve" : -90, "color" : "FFDD00", "trait" : "line" },
		{ "v0" : 105, "v1" : 106, "curve" : 90, "color" : "FFDD00", "trait" : "line" },
		
		{ "v0" : 107, "v1" : 108, "curve" : 0, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "x" : -10 },
		{ "v0" : 109, "v1" : 110, "curve" : 0, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "x" : 10 },
		{ "v0" : 111, "v1" : 112, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "y" : 5 },
		{ "v0" : 113, "v1" : 114, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "y" : 35 },
		{ "v0" : 115, "v1" : 116, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "y" : -20 },
		{ "v0" : 117, "v1" : 118, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "y" : -50 },
		{ "v0" : 114, "v1" : 113, "curve" : -129.997900266, "vis" : true, "color" : "FFDD00", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier" },
		{ "v0" : 118, "v1" : 117, "curve" : 103.422024528, "vis" : true, "color" : "FFDD00", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier" },
		{ "v0" : 119, "v1" : 120, "curve" : 64.5746162722, "vis" : true, "color" : "004dff", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "x" : 200 },
		{ "v0" : 121, "v1" : 122, "curve" : -60.1197451124, "vis" : true, "color" : "f73131", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "x" : -200 },
		{ "v0" : 116, "v1" : 112, "curve" : -12, "vis" : true, "color" : "FFDD00", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "x" : -180 },
		{ "v0" : 115, "v1" : 111, "curve" : 12, "vis" : true, "color" : "FFDD00", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier", "x" : 180 },
		{ "v0" : 123, "v1" : 124, "curve" : 0, "vis" : true, "color" : "FFDD00", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier" },
		{ "v0" : 125, "v1" : 126, "curve" : 0, "vis" : true, "color" : "FFDD00", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier" },
		
		{ "v0" : 127, "v1" : 128, "vis" : true, "color" : "FFDD00", "trait" : "line" },
		{ "v0" : 129, "v1" : 130, "curve" : 90, "color" : "FFDD00", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 131, "v1" : 132, "curve" : 90, "color" : "FFDD00", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 133, "v1" : 134, "curve" : 90, "color" : "FFDD00", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 135, "v1" : 136, "curve" : 90, "color" : "FFDD00", "bCoef" : 0, "cMask" : ["wall" ], "trait" : "line" },
		{ "v0" : 137, "v1" : 138, "curve" : 45, "vis" : true, "color" : "FFDD00", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		{ "v0" : 139, "v1" : 140, "curve" : 45, "vis" : true, "color" : "FFDD00", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		{ "v0" : 141, "v1" : 142, "curve" : 45, "vis" : true, "color" : "FFDD00", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		{ "v0" : 143, "v1" : 144, "curve" : 45, "vis" : true, "color" : "FFDD00", "bCoef" : -2.45, "cMask" : ["ball" ], "trait" : "line" },
		
		{ "v0" : 145, "v1" : 146, "curve" : 0, "vis" : false, "color" : "f9f6e8", "bCoef" : 1.1, "cMask" : ["ball" ], "y" : -82 },
		{ "v0" : 147, "v1" : 148, "curve" : 0, "vis" : false, "color" : "f9f6e8", "bCoef" : 1.1, "cMask" : ["ball" ], "y" : 82 },
		{ "v0" : 149, "v1" : 150, "curve" : 0, "vis" : false, "color" : "f9f6e8", "bCoef" : 1.1, "cMask" : ["ball" ], "y" : -82 },
		{ "v0" : 151, "v1" : 152, "curve" : 0, "vis" : false, "color" : "f9f6e8", "bCoef" : 1.1, "cMask" : ["ball" ], "y" : 82 },
		
		{ "v0" : 73, "v1" : 72, "curve" : 40, "vis" : true, "color" : "FFDD00", "bCoef" : -4.5, "cMask" : ["ball" ], "trait" : "line", "x" : 720 },
		
		{ "v0" : 153, "v1" : 154, "curve" : 0, "vis" : true, "color" : "222223", "bCoef" : 1.2, "cMask" : ["ball" ], "y" : -320 },
		{ "v0" : 155, "v1" : 156, "curve" : 0, "vis" : true, "color" : "222223", "bCoef" : 1.2, "cMask" : ["ball" ] },
		{ "v0" : 158, "v1" : 157, "curve" : 10, "vis" : false, "color" : "FFFFFF", "bCoef" : -5, "cMask" : ["ball" ] },
		{ "v0" : 160, "v1" : 159, "curve" : 10, "vis" : false, "color" : "FFFFFF", "bCoef" : -5, "cMask" : ["ball" ], "x" : -682 },
		{ "v0" : 162, "v1" : 161, "curve" : 10, "vis" : false, "color" : "FFFFFF", "bCoef" : -5, "cMask" : ["ball" ], "x" : 682 },
		{ "v0" : 164, "v1" : 163, "curve" : 10, "vis" : false, "color" : "FFFFFF", "bCoef" : -5, "cMask" : ["ball" ], "x" : 682 }

	],

	"goals" : [
		{ "p0" : [-710,-82 ], "p1" : [-710,82 ], "team" : "red" },
		{ "p0" : [711,82 ], "p1" : [711,-82 ], "team" : "blue" }

	],

	"discs" : [
		{ "radius" : 3, "invMass" : 0, "pos" : [-700,-320 ], "color" : "FFFF00", "trait" : "cornerflag" },
		{ "radius" : 3, "invMass" : 0, "pos" : [700,320 ], "color" : "FFFF00", "trait" : "cornerflag" },
		{ "radius" : 3, "invMass" : 0, "pos" : [700,-320 ], "color" : "FFFF00", "trait" : "cornerflag" },
		{ "radius" : 3, "invMass" : 0, "pos" : [-700,320 ], "color" : "FFFF00", "trait" : "cornerflag" },
		
		{ "radius" : 5, "pos" : [-700,83.5 ], "color" : "f73131", "trait" : "goalPost" },
		{ "radius" : 5, "pos" : [-700,-83.5 ], "color" : "f73131", "trait" : "goalPost" },
		{ "radius" : 5, "pos" : [700,-83.5 ], "color" : "004DFF", "trait" : "goalPost" },
		{ "radius" : 5, "pos" : [700,83.5 ], "color" : "004DFF", "trait" : "goalPost" }

	],

	"planes" : [
		{ "normal" : [0,1 ], "dist" : -346, "bCoef" : 0, "trait" : "ballArea" },
		{ "normal" : [0,-1 ], "dist" : -346, "bCoef" : 0, "trait" : "ballArea" },
		
		{ "normal" : [0,1 ], "dist" : -390, "bCoef" : 0 },
		{ "normal" : [0,-1 ], "dist" : -392, "bCoef" : 0 },
		
		{ "normal" : [1,0 ], "dist" : -763, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea" },
		{ "normal" : [-1,0 ], "dist" : -763, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 0 },
		
		{ "normal" : [1,0 ], "dist" : -970, "bCoef" : 0 },
		{ "normal" : [-1,0 ], "dist" : -971, "bCoef" : 0 }

	],

	"traits" : {
		"ballArea" : { "vis" : false, "bCoef" : 0, "cMask" : ["ball" ] },
		"goalPost" : { "radius" : 5, "invMass" : 0, "bCoef" : 2 },
		"stanchion" : { "radius" : 3, "invMass" : 0, "bCoef" : 3, "cMask" : ["none" ] },
		"cornerflag" : { "radius" : 3, "invMass" : 0, "bCoef" : 0.5, "color" : "FFFF00", "cGroup" : [ ] },
		"reargoalNetleft" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : 10, "color" : "C7E6BD" },
		"reargoalNetright" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : -10, "color" : "C7E6BD" },
		"sidegoalNet" : { "vis" : true, "bCoef" : 1, "cMask" : ["ball","red","blue" ], "color" : "C7E6BD" },
		"kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] },
		"line" : { "vis" : true, "cMask" : [ ], "color" : "C7E6BD" },
		"tunnel" : { "vis" : true, "cMask" : ["red","blue" ], "color" : "000000" },
		"advertising" : { "vis" : true, "cMask" : ["red","blue" ], "color" : "333333" },
		"teambench" : { "vis" : true, "cMask" : [ ], "color" : "000000" },
		"manager" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "333333" },
		"physio" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "666666" },
		"redsubs" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "E56E56" },
		"bluesubs" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "5689E5" }

	}
}`;
var mapLineUp = `{"name":"V6 Dizilim","width":700,"height":500,"spawnDistance":500,"bg":{"type":"grass","height":180,"width":280,"cornerRadius":0},"vertexes":[{"x":3,"y":70,"bCoef":-1},{"x":3,"y":180},{"x":-3,"y":70,"bCoef":-1},{"x":-3,"y":180},{"x":-3,"y":69,"bCoef":-1,"curve":0},{"x":-3,"y":-69,"bCoef":-1,"curve":0},{"x":3,"y":69,"bCoef":-1},{"x":3,"y":-69,"bCoef":-1},{"x":-3,"y":-180},{"x":-2,"y":-70,"bCoef":-1},{"x":3,"y":-180},{"x":3,"y":-70,"bCoef":-1},{"x":-171,"y":-61,"bCoef":-1,"color":"FF0033","curve":0},{"x":-171,"y":-46,"bCoef":-1,"color":"FF0033","curve":0},{"x":-201,"y":-46,"bCoef":-1,"color":"FF0033","curve":0},{"x":-201,"y":-61,"bCoef":-1,"color":"FF0033","curve":0},{"x":-121,"y":-11,"bCoef":-1,"color":"FF0033","curve":0},{"x":-121,"y":4,"bCoef":-1,"color":"FF0033","curve":0},{"x":-151,"y":4,"bCoef":-1,"color":"FF0033","curve":0},{"x":-151,"y":-11,"bCoef":-1,"color":"FF0033","curve":0},{"x":-91,"y":-91,"bCoef":-1,"color":"FF0033","curve":0},{"x":-91,"y":-76,"bCoef":-1,"color":"FF0033","curve":0},{"x":-121,"y":-76,"bCoef":-1,"color":"FF0033","curve":0},{"x":-121,"y":-91,"bCoef":-1,"color":"FF0033","curve":0},{"x":119,"y":-91,"bCoef":-1,"color":"3366FF"},{"x":119,"y":-76,"bCoef":-1,"color":"3366FF","curve":0},{"x":89,"y":-76,"bCoef":-1,"color":"3366FF","curve":0},{"x":89,"y":-91,"bCoef":-1,"color":"3366FF"},{"x":199,"y":-61,"bCoef":-1,"color":"3366FF"},{"x":199,"y":-46,"bCoef":-1,"color":"3366FF","curve":0},{"x":169,"y":-46,"bCoef":-1,"color":"3366FF","curve":0},{"x":169,"y":-61,"bCoef":-1,"color":"3366FF"},{"x":149,"y":-11,"bCoef":-1,"color":"3366FF"},{"x":149,"y":4,"bCoef":-1,"color":"3366FF","curve":0},{"x":119,"y":4,"bCoef":-1,"color":"3366FF","curve":0},{"x":119,"y":-11,"bCoef":-1,"color":"3366FF"},{"x":-132,"y":-161,"bCoef":-1,"color":"FF0033","curve":0},{"x":-132,"y":-146,"bCoef":-1,"color":"FF0033","curve":0},{"x":-162,"y":-146,"bCoef":-1,"color":"FF0033","curve":0},{"x":-162,"y":-161,"bCoef":-1,"color":"FF0033","curve":0},{"x":134,"y":-161,"bCoef":-1,"color":"3366FF"},{"x":134,"y":-146,"bCoef":-1,"color":"3366FF","curve":0},{"x":164,"y":-146,"bCoef":-1,"color":"3366FF","curve":0},{"x":164,"y":-161,"bCoef":-1,"color":"3366FF"},{"x":-126,"y":69,"bCoef":-1,"color":"FF0033","curve":0},{"x":-126,"y":84,"bCoef":-1,"color":"FF0033","curve":0},{"x":-156,"y":84,"bCoef":-1,"color":"FF0033","curve":0},{"x":-156,"y":69,"bCoef":-1,"color":"FF0033","curve":0},{"x":154,"y":69,"bCoef":-1,"color":"3366FF"},{"x":154,"y":84,"bCoef":-1,"color":"3366FF","curve":0},{"x":124,"y":84,"bCoef":-1,"color":"3366FF","curve":0},{"x":124,"y":69,"bCoef":-1,"color":"3366FF"},{"x":-189,"y":180,"trait":"none","color":"C7E6BD","curve":0},{"x":-99,"y":180,"trait":"none","color":"C7E6BD","curve":0},{"x":100,"y":180,"trait":"none","color":"C7E6BD"},{"x":190,"y":180,"trait":"none","color":"C7E6BD"},{"x":99,"y":-180,"trait":"none","color":"C7E6BD"},{"x":189,"y":-180,"trait":"none","color":"C7E6BD"},{"x":-189,"y":-180,"trait":"none","color":"C7E6BD"},{"x":-99,"y":-180,"trait":"none","color":"C7E6BD"},{"x":-189,"y":-210,"trait":"none"},{"x":-99,"y":-210,"trait":"none"},{"x":99,"y":-210,"trait":"none"},{"x":189,"y":-210,"trait":"none"},{"x":99,"y":210,"trait":"none"},{"x":189,"y":210,"trait":"none"},{"x":-99,"y":210,"trait":"none"},{"x":-189,"y":210,"trait":"none"},{"x":-189,"y":180,"trait":"none"},{"x":0,"y":-270,"curve":0},{"x":0,"y":292.01041793823,"curve":0},{"x":-320,"y":-270,"bCoef":-1,"trait":"none"},{"x":-320,"y":219,"bCoef":-1,"trait":"none"},{"x":335,"y":219,"bCoef":-1,"trait":"none"},{"x":-620,"y":-270,"bCoef":0,"cMask":["red","blue","ball"],"trait":"ballArea"},{"x":-620,"y":219,"bCoef":0,"cMask":["red","blue","ball"],"trait":"ballArea"},{"x":620,"y":219,"bCoef":-1},{"x":-450,"y":-271,"bCoef":0,"cMask":["red","blue","ball"],"trait":"none"},{"x":-450,"y":222,"bCoef":0,"cMask":["red","blue","ball"],"trait":"none"},{"x":620,"y":-269,"bCoef":0,"cMask":["red","blue","ball"]},{"x":620,"y":-271,"bCoef":0,"cMask":["red","blue","ball"],"trait":"none"},{"x":620,"y":219,"bCoef":0,"cMask":["red","blue","ball"],"trait":"none"},{"x":320,"y":-270,"bCoef":-1,"trait":"ballArea"},{"x":320,"y":216,"bCoef":-1,"trait":"ballArea"},{"x":410,"y":-268,"bCoef":-1,"trait":"none"},{"x":410,"y":216,"bCoef":-1,"trait":"none"},{"x":-520,"y":-271.33333587646,"bCoef":0,"cMask":["red","blue","ball"],"trait":"ballArea"},{"x":-520,"y":216.66666412354,"bCoef":0,"cMask":["red","blue","ball"],"trait":"ballArea"},{"x":335,"y":-269.33333587646,"bCoef":-1,"cMask":["ball"],"trait":"ballArea"},{"x":-539.66666793823,"y":-271.33333587646,"bCoef":0,"cMask":["red","blue","ball"],"vis":false},{"x":-542.66666793823,"y":216.66666412354,"bCoef":0,"cMask":["red","blue","ball"],"vis":false},{"x":-155,"y":92,"trait":"none","curve":178,"color":"FFFFFF"},{"x":-155,"y":109,"trait":"none","curve":178,"color":"FFFFFF"},{"x":-139.20000076294,"y":93,"trait":"none","color":"FFFFFF"},{"x":-139.20000076294,"y":110,"trait":"none","color":"FFFFFF"},{"x":-123,"y":93,"trait":"none","color":"FFFFFF"},{"x":-138,"y":100,"trait":"none","color":"FFFFFF"},{"x":-126,"y":100,"trait":"none","color":"FFFFFF"},{"x":-156,"y":12,"trait":"none","curve":178,"color":"FFFFFF"},{"x":-156,"y":29,"trait":"none","curve":178,"color":"FFFFFF"},{"x":-136,"y":14,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":-136,"y":28,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":-118.80000305176,"y":22,"trait":"none","color":"FFFFFF"},{"x":-125,"y":29,"trait":"none","color":"FFFFFF"},{"x":-115.5,"y":14,"trait":"none","color":"FFFFFF"},{"x":-165.20000076294,"y":-137,"trait":"none","color":"FFFFFF"},{"x":-165.20000076294,"y":-120,"trait":"none","color":"FFFFFF"},{"x":-149,"y":-137,"trait":"none","color":"FFFFFF"},{"x":-165.20000076294,"y":-131,"trait":"none","color":"FFFFFF"},{"x":-153,"y":-131,"trait":"none","color":"FFFFFF"},{"x":-142,"y":-138,"trait":"none","color":"FFFFFF"},{"x":-134,"y":-122,"trait":"none","color":"FFFFFF"},{"x":-126,"y":-138,"trait":"none","color":"FFFFFF"},{"x":114,"y":11,"trait":"none","curve":178,"color":"FFFFFF"},{"x":114,"y":28,"trait":"none","curve":178,"color":"FFFFFF"},{"x":134,"y":13,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":134,"y":27,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":151.19999694824,"y":21,"trait":"none","color":"FFFFFF"},{"x":145,"y":28,"trait":"none","color":"FFFFFF"},{"x":154.5,"y":13,"trait":"none","color":"FFFFFF"},{"x":177,"y":-37,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":177,"y":-23,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":194.19999694824,"y":-29,"trait":"none","color":"FFFFFF"},{"x":188,"y":-22,"trait":"none","color":"FFFFFF"},{"x":197.5,"y":-37,"trait":"none","color":"FFFFFF"},{"x":104,"y":-66,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":104,"y":-52,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":121.19999694824,"y":-58,"trait":"none","color":"FFFFFF"},{"x":115,"y":-51,"trait":"none","color":"FFFFFF"},{"x":124.5,"y":-66,"trait":"none","color":"FFFFFF"},{"x":86,"y":-66,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":86,"y":-52,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":-105,"y":-69,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":-105,"y":-55,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":-87.800003051758,"y":-61,"trait":"none","color":"FFFFFF"},{"x":-94,"y":-54,"trait":"none","color":"FFFFFF"},{"x":-84.5,"y":-69,"trait":"none","color":"FFFFFF"},{"x":-123,"y":-69,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":-123,"y":-55,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":-194,"y":-38,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":-194,"y":-24,"trait":"none","curve":-180,"color":"FFFFFF"},{"x":-176.80000305176,"y":-30,"trait":"none","color":"FFFFFF"},{"x":-183,"y":-23,"trait":"none","color":"FFFFFF"},{"x":-173.5,"y":-38,"trait":"none","color":"FFFFFF"},{"x":126,"y":92,"trait":"none","curve":178,"color":"FFFFFF"},{"x":126,"y":109,"trait":"none","curve":178,"color":"FFFFFF"},{"x":141.79999923706,"y":93,"trait":"none","color":"FFFFFF"},{"x":141.79999923706,"y":110,"trait":"none","color":"FFFFFF"},{"x":158,"y":93,"trait":"none","color":"FFFFFF"},{"x":143,"y":100,"trait":"none","color":"FFFFFF"},{"x":155,"y":100,"trait":"none","color":"FFFFFF"},{"x":129.79999923706,"y":-137,"trait":"none","color":"FFFFFF"},{"x":129.79999923706,"y":-120,"trait":"none","color":"FFFFFF"},{"x":146,"y":-137,"trait":"none","color":"FFFFFF"},{"x":129.79999923706,"y":-131,"trait":"none","color":"FFFFFF"},{"x":142,"y":-131,"trait":"none","color":"FFFFFF"},{"x":153,"y":-138,"trait":"none","color":"FFFFFF"},{"x":161,"y":-122,"trait":"none","color":"FFFFFF"},{"x":169,"y":-138,"trait":"none","color":"FFFFFF"},{"x":-129,"y":165,"bCoef":-1,"color":"FF0033","curve":0},{"x":-129,"y":180,"bCoef":-1,"color":"FF0033","curve":0},{"x":-159,"y":180,"bCoef":-1,"color":"FF0033","curve":0},{"x":-159,"y":165,"bCoef":-1,"color":"FF0033","curve":0},{"x":159,"y":165,"bCoef":-1,"color":"3366FF","curve":0},{"x":159,"y":180,"bCoef":-1,"color":"3366FF","curve":0},{"x":129,"y":180,"bCoef":-1,"color":"3366FF","curve":0},{"x":129,"y":165,"bCoef":-1,"color":"3366FF","curve":0},{"x":-158.5,"y":185,"trait":"none","color":"FFFFFF"},{"x":-158.5,"y":204,"trait":"none","color":"FFFFFF"},{"x":-147.5,"y":185,"trait":"none","color":"FFFFFF"},{"x":-157.5,"y":194,"trait":"none","color":"FFFFFF"},{"x":-146.5,"y":203,"trait":"none","color":"FFFFFF"},{"x":-140,"y":185.25390625,"trait":"none","color":"FFFFFF"},{"x":-140,"y":203,"trait":"none","color":"FFFFFF"},{"x":-127.5,"y":203,"trait":"none","color":"FFFFFF"},{"x":130.5,"y":183,"trait":"none","color":"FFFFFF"},{"x":130.5,"y":202,"trait":"none","color":"FFFFFF"},{"x":141.5,"y":183,"trait":"none","color":"FFFFFF"},{"x":131.5,"y":192,"trait":"none","color":"FFFFFF"},{"x":142.5,"y":201,"trait":"none","color":"FFFFFF"},{"x":149,"y":183.25390625,"trait":"none","color":"FFFFFF"},{"x":149,"y":201,"trait":"none","color":"FFFFFF"},{"x":161.5,"y":201,"trait":"none","color":"FFFFFF"},{"x":-144.33332824707,"y":153,"trait":"none","colr":"FFFFFF"},{"x":-144.33332824707,"y":171,"trait":"none","color":"FFFFFF"},{"x":-147.33332824707,"y":60.666687011719,"trait":"none","color":"FFFFFF"},{"x":-134.33332824707,"y":60.666687011719,"trait":"none","color":"FFFFFF"},{"x":-134.33332824707,"y":78.666687011719,"trait":"none","color":"FFFFFF"},{"x":-147.33332824707,"y":78.666687011719,"trait":"none","color":"FFFFFF"},{"x":-137.33332824707,"y":68.666687011719,"trait":"none","color":"FFFFFF"},{"x":-145.33332824707,"y":68.666687011719,"trait":"none","color":"FFFFFF"},{"x":-129,"y":-27,"trait":"none","color":"FFFFFF"},{"x":-144,"y":-27,"trait":"none","color":"FFFFFF"},{"x":-144,"y":-7,"trait":"none","color":"FFFFFF"},{"x":-129,"y":-7,"trait":"none","color":"FFFFFF"},{"x":-129,"y":-17,"trait":"none","color":"FFFFFF"},{"x":-144,"y":-17,"trait":"none","color":"FFFFFF"},{"x":-194,"y":-78,"trait":"none","color":"FFFFFF"},{"x":-178,"y":-78,"trait":"none","color":"FFFFFF"},{"x":-178,"y":-56,"trait":"none","color":"FFFFFF"},{"x":-194,"y":-56,"trait":"none","color":"FFFFFF"},{"x":-191.5,"y":-67,"trait":"none","color":"FFFFFF"},{"x":-180.5,"y":-67,"trait":"none","color":"FFFFFF"},{"x":-114,"y":-107,"trait":"none","color":"FFFFFF"},{"x":-114,"y":-85,"trait":"none","color":"FFFFFF"},{"x":-155,"y":-176,"trait":"none","color":"FFFFFF"},{"x":-138,"y":-176,"trait":"none","color":"FFFFFF"},{"x":-139,"y":-166,"trait":"none","color":"FFFFFF"},{"x":-155,"y":-166,"trait":"none","color":"FFFFFF"},{"x":-139,"y":-156,"trait":"none","color":"FFFFFF"},{"x":-155,"y":-156,"trait":"none","color":"FFFFFF"},{"x":133.66667175293,"y":59.666687011719,"trait":"none","color":"FFFFFF"},{"x":146.66667175293,"y":59.666687011719,"trait":"none","color":"FFFFFF"},{"x":146.66667175293,"y":77.666687011719,"trait":"none","color":"FFFFFF"},{"x":133.66667175293,"y":77.666687011719,"trait":"none","color":"FFFFFF"},{"x":143.66667175293,"y":67.666687011719,"trait":"none","color":"FFFFFF"},{"x":135.66667175293,"y":67.666687011719,"trait":"none","color":"FFFFFF"},{"x":144.66667175293,"y":152,"trait":"none","color":"FFFFFF"},{"x":144.66667175293,"y":170,"trait":"none","color":"FFFFFF"},{"x":176,"y":-75,"trait":"none","color":"FFFFFF"},{"x":192,"y":-75,"trait":"none","color":"FFFFFF"},{"x":192,"y":-53,"trait":"none","color":"FFFFFF"},{"x":176,"y":-53,"trait":"none","color":"FFFFFF"},{"x":178.5,"y":-64,"trait":"none","color":"FFFFFF"},{"x":189.5,"y":-64,"trait":"none","color":"FFFFFF"},{"x":-108.18182373047,"y":-106,"trait":"none","color":"FFFFFF"},{"x":-108.18182373047,"y":-86,"trait":"none","color":"FFFFFF"},{"x":-97,"y":-86,"trait":"none","color":"FFFFFF"},{"x":-97,"y":-106,"trait":"none","color":"FFFFFF"},{"x":95,"y":-107,"trait":"none","color":"FFFFFF"},{"x":95,"y":-85,"trait":"none","color":"FFFFFF"},{"x":100.81817626953,"y":-106,"trait":"none","color":"FFFFFF"},{"x":100.81817626953,"y":-86,"trait":"none","color":"FFFFFF"},{"x":112,"y":-86,"trait":"none","color":"FFFFFF"},{"x":112,"y":-106,"trait":"none","color":"FFFFFF"},{"x":141,"y":-25,"trait":"none","color":"FFFFFF"},{"x":126,"y":-25,"trait":"none","color":"FFFFFF"},{"x":126,"y":-5,"trait":"none","color":"FFFFFF"},{"x":141,"y":-5,"trait":"none","color":"FFFFFF"},{"x":141,"y":-15,"trait":"none","color":"FFFFFF"},{"x":127.66667175293,"y":-15,"trait":"none","color":"FFFFFF"},{"x":141,"y":-174,"trait":"none","color":"FFFFFF"},{"x":158,"y":-174,"trait":"none","color":"FFFFFF"},{"x":157,"y":-164,"trait":"none","color":"FFFFFF"},{"x":141,"y":-164,"trait":"none","color":"FFFFFF"},{"x":157,"y":-154,"trait":"none","color":"FFFFFF"},{"x":141,"y":-154,"trait":"none","color":"FFFFFF"}],"segments":[{"v0":0,"v1":1,"vis":true,"color":"051AA6","x":3},{"v0":2,"v1":3,"vis":true,"color":"051AA6","x":-3},{"v0":4,"v1":5,"curve":0,"vis":true,"color":"33BF00","bCoef":-1,"x":-3},{"v0":6,"v1":7,"vis":true,"color":"33BF00","bCoef":-1,"x":3},{"v0":8,"v1":9,"curve":0,"vis":true,"color":"FF0000"},{"v0":10,"v1":11,"curve":0,"vis":true,"color":"FF0000"},{"v0":12,"v1":13,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"x":-170},{"v0":13,"v1":14,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"y":0},{"v0":14,"v1":15,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"x":-200,"y":-8},{"v0":16,"v1":17,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"x":-120},{"v0":17,"v1":18,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"y":50},{"v0":18,"v1":19,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"x":-150,"y":-8},{"v0":20,"v1":21,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"x":-90},{"v0":21,"v1":22,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"y":-40},{"v0":22,"v1":23,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"x":-120,"y":-8},{"v0":24,"v1":25,"vis":true,"color":"3366FF","bCoef":-1,"x":120},{"v0":25,"v1":26,"curve":0,"vis":true,"color":"3366FF","bCoef":-1,"y":-30},{"v0":26,"v1":27,"vis":true,"color":"3366FF","bCoef":-1,"x":90,"y":-8},{"v0":28,"v1":29,"vis":true,"color":"3366FF","bCoef":-1,"x":200},{"v0":29,"v1":30,"curve":0,"vis":true,"color":"3366FF","bCoef":-1,"y":0},{"v0":30,"v1":31,"vis":true,"color":"3366FF","bCoef":-1,"x":170,"y":-8},{"v0":32,"v1":33,"vis":true,"color":"3366FF","bCoef":-1,"x":150},{"v0":33,"v1":34,"curve":0,"vis":true,"color":"3366FF","bCoef":-1,"y":50},{"v0":34,"v1":35,"vis":true,"color":"3366FF","bCoef":-1,"x":120,"y":-8},{"v0":36,"v1":37,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"x":-133},{"v0":37,"v1":38,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"y":-105},{"v0":38,"v1":39,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"x":-163,"y":-8},{"v0":40,"v1":41,"vis":true,"color":"3366FF","bCoef":-1,"x":129},{"v0":41,"v1":42,"curve":0,"vis":true,"color":"3366FF","bCoef":-1,"y":-105},{"v0":42,"v1":43,"vis":true,"color":"3366FF","bCoef":-1,"x":159,"y":-8},{"v0":44,"v1":45,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"x":-125},{"v0":45,"v1":46,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"y":130},{"v0":46,"v1":47,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"x":-155,"y":-8},{"v0":48,"v1":49,"vis":true,"color":"3366FF","bCoef":-1,"x":155},{"v0":49,"v1":50,"curve":0,"vis":true,"color":"3366FF","bCoef":-1,"y":130},{"v0":50,"v1":51,"vis":true,"color":"3366FF","bCoef":-1,"x":125,"y":-8},{"v0":52,"v1":53,"curve":0,"color":"C7E6BD","trait":"none","y":180},{"v0":54,"v1":55,"color":"C7E6BD","trait":"none","y":180},{"v0":56,"v1":57,"color":"C7E6BD","trait":"none","y":-180},{"v0":58,"v1":59,"color":"C7E6BD","trait":"none","y":-180},{"v0":58,"v1":60,"color":"ffffff","trait":"none"},{"v0":59,"v1":61,"color":"ffffff","trait":"none"},{"v0":61,"v1":60,"color":"ffffff","trait":"none"},{"v0":56,"v1":62,"color":"ffffff","trait":"none"},{"v0":62,"v1":63,"color":"ffffff","trait":"none","y":-210},{"v0":63,"v1":57,"color":"ffffff","trait":"none"},{"v0":54,"v1":64,"color":"ffffff","trait":"none"},{"v0":64,"v1":65,"color":"ffffff","trait":"none"},{"v0":65,"v1":55,"color":"ffffff","trait":"none"},{"v0":53,"v1":66,"color":"ffffff","trait":"none"},{"v0":66,"v1":67,"color":"ffffff","trait":"none"},{"v0":67,"v1":68,"color":"ffffff","trait":"none"},{"v0":69,"v1":70,"curve":0,"vis":false,"color":"33BF00","x":0},{"v0":71,"v1":72,"curve":0,"vis":true,"color":"C7E6BD","bCoef":-1,"trait":"none","x":-320},{"v0":75,"v1":73,"curve":0,"vis":true,"color":"C7E6BD","bCoef":0,"cMask":["red","blue","ball"],"y":219},{"v0":73,"v1":76,"curve":0,"vis":true,"color":"C7E6BD","bCoef":-1},{"v0":74,"v1":79,"curve":0,"vis":true,"color":"C7E6BD","bCoef":0,"cMask":["red","blue","ball"]},{"v0":82,"v1":83,"curve":0,"vis":true,"color":"C7E6BD","bCoef":-1,"trait":"ballArea","x":320},{"v0":74,"v1":75,"curve":0,"vis":true,"color":"C7E6BD","bCoef":-1,"trait":"ballArea","x":-620},{"v0":80,"v1":81,"curve":0,"vis":true,"color":"C7E6BD","bCoef":-1,"cMask":["ball"],"trait":"ballArea","x":620},{"v0":91,"v1":92,"curve":178,"color":"FFFFFF","trait":"none"},{"v0":91,"v1":92,"curve":0,"color":"FFFFFF","trait":"none","x":-160},{"v0":93,"v1":94,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":93,"v1":95,"curve":0,"color":"FFFFFF","trait":"none","y":145},{"v0":96,"v1":97,"curve":0,"color":"FFFFFF","trait":"none","y":156},{"v0":98,"v1":99,"curve":178,"color":"FFFFFF","trait":"none"},{"v0":98,"v1":99,"curve":0,"color":"FFFFFF","trait":"none","x":-160},{"v0":100,"v1":101,"curve":180,"color":"FFFFFF","trait":"none"},{"v0":100,"v1":101,"curve":-180,"color":"FFFFFF","trait":"none","x":-160},{"v0":102,"v1":103,"curve":203.90536429387,"color":"FFFFFF","trait":"none"},{"v0":102,"v1":104,"curve":208.07248693585,"color":"FFFFFF","trait":"none"},{"v0":105,"v1":106,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":105,"v1":107,"curve":0,"color":"FFFFFF","trait":"none","y":145},{"v0":108,"v1":109,"curve":0,"color":"FFFFFF","trait":"none","y":-89},{"v0":110,"v1":111,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":111,"v1":112,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":113,"v1":114,"curve":178,"color":"FFFFFF","trait":"none"},{"v0":113,"v1":114,"curve":0,"color":"FFFFFF","trait":"none","x":-160},{"v0":115,"v1":116,"curve":180,"color":"FFFFFF","trait":"none"},{"v0":115,"v1":116,"curve":-180,"color":"FFFFFF","trait":"none","x":-160},{"v0":117,"v1":118,"curve":203.90536429387,"color":"FFFFFF","trait":"none"},{"v0":117,"v1":119,"curve":208.07248693585,"color":"FFFFFF","trait":"none"},{"v0":120,"v1":121,"curve":180,"color":"FFFFFF","trait":"none"},{"v0":120,"v1":121,"curve":-180,"color":"FFFFFF","trait":"none","x":-160},{"v0":122,"v1":123,"curve":203.90536429387,"color":"FFFFFF","trait":"none"},{"v0":122,"v1":124,"curve":208.07248693585,"color":"FFFFFF","trait":"none"},{"v0":125,"v1":126,"curve":180,"color":"FFFFFF","trait":"none"},{"v0":125,"v1":126,"curve":-180,"color":"FFFFFF","trait":"none","x":-160},{"v0":127,"v1":128,"curve":203.90536429387,"color":"FFFFFF","trait":"none"},{"v0":127,"v1":129,"curve":208.07248693585,"color":"FFFFFF","trait":"none"},{"v0":130,"v1":131,"curve":180,"color":"FFFFFF","trait":"none"},{"v0":130,"v1":131,"curve":-180,"color":"FFFFFF","trait":"none","x":-160},{"v0":132,"v1":133,"curve":180,"color":"FFFFFF","trait":"none"},{"v0":132,"v1":133,"curve":-180,"color":"FFFFFF","trait":"none","x":-160},{"v0":134,"v1":135,"curve":203.90536429387,"color":"FFFFFF","trait":"none"},{"v0":134,"v1":136,"curve":208.07248693585,"color":"FFFFFF","trait":"none"},{"v0":137,"v1":138,"curve":180,"color":"FFFFFF","trait":"none"},{"v0":137,"v1":138,"curve":-180,"color":"FFFFFF","trait":"none","x":-160},{"v0":139,"v1":140,"curve":180,"color":"FFFFFF","trait":"none"},{"v0":139,"v1":140,"curve":-180,"color":"FFFFFF","trait":"none","x":-160},{"v0":141,"v1":142,"curve":203.90536429387,"color":"FFFFFF","trait":"none"},{"v0":141,"v1":143,"curve":208.07248693585,"color":"FFFFFF","trait":"none"},{"v0":144,"v1":145,"curve":178,"color":"FFFFFF","trait":"none"},{"v0":144,"v1":145,"curve":0,"color":"FFFFFF","trait":"none","x":-160},{"v0":146,"v1":147,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":146,"v1":148,"curve":0,"color":"FFFFFF","trait":"none","y":145},{"v0":149,"v1":150,"curve":0,"color":"FFFFFF","trait":"none","y":156},{"v0":151,"v1":152,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":151,"v1":153,"curve":0,"color":"FFFFFF","trait":"none","y":145},{"v0":154,"v1":155,"curve":0,"color":"FFFFFF","trait":"none","y":-89},{"v0":156,"v1":157,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":157,"v1":158,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":159,"v1":160,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"x":-129},{"v0":160,"v1":161,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"y":130},{"v0":161,"v1":162,"curve":0,"vis":true,"color":"FF0033","bCoef":-1,"x":-159,"y":-8},{"v0":163,"v1":164,"curve":0,"vis":true,"color":"3366FF","bCoef":-1,"x":159},{"v0":164,"v1":165,"curve":0,"vis":true,"color":"3366FF","bCoef":-1,"y":180},{"v0":165,"v1":166,"curve":0,"vis":true,"color":"3366FF","bCoef":-1,"x":129,"y":-8},{"v0":167,"v1":168,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":169,"v1":170,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":170,"v1":171,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":172,"v1":173,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":173,"v1":174,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":175,"v1":176,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":177,"v1":178,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":178,"v1":179,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":180,"v1":181,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":181,"v1":182,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":183,"v1":184,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":185,"v1":186,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":186,"v1":187,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":187,"v1":188,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":189,"v1":190,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":191,"v1":192,"curve":0,"color":"FFFFFF","trait":"none","y":-26},{"v0":192,"v1":193,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":193,"v1":194,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":194,"v1":195,"curve":0,"color":"FFFFFF","trait":"none","x":-130},{"v0":195,"v1":196,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":197,"v1":198,"curve":0,"color":"FFFFFF","trait":"none","y":-78},{"v0":198,"v1":199,"curve":0,"color":"FFFFFF","trait":"none","x":-180},{"v0":199,"v1":200,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":200,"v1":197,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":201,"v1":202,"curve":0,"color":"FFFFFF","trait":"none","y":-67},{"v0":203,"v1":204,"curve":0,"color":"FFFFFF","trait":"none","x":-115},{"v0":205,"v1":206,"curve":0,"color":"FFFFFF","trait":"none","y":-176},{"v0":206,"v1":207,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":207,"v1":208,"curve":0,"color":"FFFFFF","trait":"none","y":-166},{"v0":208,"v1":205,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":207,"v1":209,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":209,"v1":210,"curve":0,"color":"FFFFFF","trait":"none","y":-156},{"v0":211,"v1":212,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":213,"v1":214,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":215,"v1":216,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":212,"v1":213,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":217,"v1":218,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":219,"v1":220,"curve":0,"color":"FFFFFF","trait":"none","y":-78},{"v0":220,"v1":221,"curve":0,"color":"FFFFFF","trait":"none","x":-180},{"v0":221,"v1":222,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":222,"v1":219,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":223,"v1":224,"curve":0,"color":"FFFFFF","trait":"none","y":-67},{"v0":225,"v1":226,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":226,"v1":227,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":227,"v1":228,"curve":0,"color":"FFFFFF","trait":"none","x":-98},{"v0":228,"v1":225,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":229,"v1":230,"curve":0,"color":"FFFFFF","trait":"none","x":-115},{"v0":231,"v1":232,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":232,"v1":233,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":233,"v1":234,"curve":0,"color":"FFFFFF","trait":"none","x":-98},{"v0":234,"v1":231,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":235,"v1":236,"curve":0,"color":"FFFFFF","trait":"none","y":-26},{"v0":236,"v1":237,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":237,"v1":238,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":238,"v1":239,"curve":0,"color":"FFFFFF","trait":"none","x":-130},{"v0":239,"v1":240,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":241,"v1":242,"curve":0,"color":"FFFFFF","trait":"none","y":-176},{"v0":242,"v1":243,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":243,"v1":244,"curve":0,"color":"FFFFFF","trait":"none","y":-166},{"v0":244,"v1":241,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":243,"v1":245,"curve":0,"color":"FFFFFF","trait":"none"},{"v0":245,"v1":246,"curve":0,"color":"FFFFFF","trait":"none","y":-156}],"goals":[],"discs":[{"radius":5,"pos":[-189,180],"color":"ff0000","trait":"goalPost"},{"radius":5,"pos":[-99,180],"color":"ff0000","trait":"goalPost"},{"radius":5,"pos":[99,180],"color":"0000ff","trait":"goalPost"},{"radius":5,"pos":[189,180],"color":"0000ff","trait":"goalPost"},{"radius":5,"pos":[99,-180],"color":"ff0000","trait":"goalPost"},{"radius":5,"pos":[189,-180],"color":"ff0000","trait":"goalPost"},{"radius":5,"pos":[-189,-180],"color":"0000ff","trait":"goalPost"},{"radius":5,"pos":[-99,-180],"color":"0000ff","trait":"goalPost"}],"planes":[{"normal":[0,1],"dist":-270,"bCoef":0,"cMask":["red","blue","ball"]},{"normal":[0,-1],"dist":-219,"bCoef":0,"cMask":["red","blue","ball"]},{"normal":[-1,0],"dist":-621,"bCoef":0,"cMask":["red","blue","ball"]},{"normal":[1,0],"dist":-621,"bCoef":0,"cMask":["red","blue","ball"]}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]},"none":{"cMask":[""]}},"ballPhysics":{"radius":0.001,"damping":0.9999,"invMass":0.999,"bCoef":1.1,"color":"c9f364"},"playerPhysics":{"kickStrength":0.2,"bCoef":0,"acceleration":0.12,"invMass":0.4}}`;
var mapRealSoccer = `{"name":"Real Soccer V6","width":1300,"height":670,"spawnDistance":500,"bg":{"type":"grass","width":1150,"height":600,"kickOffRadius":180,"cornerRadius":0},"playerPhysics":{"bCoef":0.5,"invMass":0.5,"damping":0.96,"acceleration":0.12,"kickingAcceleration":0.07,"kickingDamping":0.96,"kickStrength":5.65},"vertexes":[{"x":0,"y":700,"trait":"kickOffBarrier"},{"x":0,"y":180,"trait":"kickOffBarrier"},{"x":0,"y":-180,"trait":"kickOffBarrier"},{"x":0,"y":-700,"trait":"kickOffBarrier"},{"x":1150,"y":255,"trait":"line"},{"x":840,"y":255,"trait":"line"},{"x":1150,"y":-255,"trait":"line"},{"x":840,"y":-255,"trait":"line"},{"x":1150,"y":155,"trait":"line"},{"x":1030,"y":155,"trait":"line"},{"x":1150,"y":-155,"trait":"line"},{"x":1030,"y":-155,"trait":"line"},{"x":840,"y":-135,"trait":"line","curve":-130},{"x":840,"y":135,"trait":"line","curve":-130},{"x":-1150,"y":-255,"trait":"line","curve":-90,"color":"97AC86"},{"x":-840,"y":-255,"trait":"line"},{"x":-1150,"y":255,"trait":"line"},{"x":-840,"y":255,"trait":"line"},{"x":-1150,"y":-155,"trait":"line"},{"x":-1030,"y":-155,"trait":"line"},{"x":-1150,"y":155,"trait":"line"},{"x":-1030,"y":155,"trait":"line"},{"x":-840,"y":135,"trait":"line","curve":-130},{"x":-840,"y":-135,"trait":"line","curve":-130},{"x":935,"y":4,"trait":"line"},{"x":935,"y":-4,"trait":"line"},{"x":-935,"y":4,"trait":"line"},{"x":-935,"y":-4,"trait":"line"},{"x":-1150,"y":525,"bCoef":0,"cMask":["wall"],"trait":"line"},{"x":-1075,"y":600,"bCoef":0,"cMask":["wall"],"trait":"line"},{"x":-1075,"y":-600,"bCoef":0,"cMask":["wall"],"trait":"line"},{"x":-1150,"y":-525,"bCoef":0,"cMask":["wall"],"trait":"line"},{"x":1075,"y":600,"bCoef":0,"cMask":["wall"],"trait":"line"},{"x":1150,"y":525,"bCoef":0,"cMask":["wall"],"trait":"line"},{"x":1150,"y":-525,"bCoef":0,"cMask":["wall"],"trait":"line"},{"x":1075,"y":-600,"bCoef":0,"cMask":["wall"],"trait":"line"},{"x":-1150,"y":127,"trait":"line","color":"ffffff"},{"x":-1214,"y":124,"trait":"line","color":"ffffff","curve":5},{"x":-1150,"y":-127,"trait":"line","color":"ffffff"},{"x":-1214,"y":-124,"trait":"line","color":"ffffff","curve":5},{"x":1150,"y":127,"trait":"line","color":"ffffff"},{"x":1214,"y":124,"trait":"line","color":"ffffff","curve":-5},{"x":1150,"y":-127,"trait":"line","color":"ffffff"},{"x":1214,"y":-124,"trait":"line","color":"ffffff","curve":-5},{"x":0,"y":-4,"trait":"line"},{"x":0,"y":4,"trait":"line"},{"x":0,"y":-4,"trait":"line"},{"x":0,"y":4,"trait":"line"},{"x":-1214,"y":124,"trait":"line","color":"ffffff"},{"x":-1250,"y":150,"trait":"line","color":"ffffff","pos":[-1250,150]},{"x":-1214,"y":-124,"trait":"line","color":"ffffff"},{"x":-1250,"y":-150,"trait":"line","color":"ffffff","pos":[-1250,-150]},{"x":1214,"y":124,"trait":"line","color":"ffffff"},{"x":1250,"y":150,"trait":"line","color":"ffffff"},{"x":1214,"y":-124,"trait":"line","color":"ffffff"},{"x":1250,"y":-150,"trait":"line","color":"ffffff"},{"x":-1185,"y":155,"bCoef":-4.5,"cMask":["ball"],"trait":"line","curve":40,"color":"BEB86C"},{"x":-1185,"y":255,"bCoef":-4.5,"cMask":["ball"],"trait":"line","curve":40,"color":"BEB86C"},{"x":1185,"y":155,"bCoef":-4.5,"cMask":["ball"],"trait":"line","curve":-40,"color":"BEB86C"},{"x":1185,"y":255,"bCoef":-4.5,"cMask":["ball"],"trait":"line","curve":-40,"color":"BEB86C"},{"x":-1185,"y":-155,"bCoef":-4.5,"cMask":["ball"],"trait":"line","curve":-40,"color":"BEB86C"},{"x":-1185,"y":-255,"bCoef":-4.5,"cMask":["ball"],"trait":"line","curve":-40,"color":"BEB86C"},{"x":1185,"y":-155,"bCoef":-4.5,"cMask":["ball"],"trait":"line","curve":40,"color":"BEB86C"},{"x":1185,"y":-255,"bCoef":-4.5,"cMask":["ball"],"trait":"line","curve":40,"color":"BEB86C"},{"x":1158,"y":-607,"bCoef":-2.45,"cMask":["ball"],"trait":"line","curve":0,"color":"BEB86C"},{"x":1187,"y":-578,"bCoef":-2.45,"cMask":["ball"],"trait":"line","curve":-60,"color":"BEB86C"},{"x":1158,"y":607,"bCoef":-2.45,"cMask":["ball"],"trait":"line","curve":0,"color":"BEB86C"},{"x":1187,"y":578,"bCoef":-2.45,"cMask":["ball"],"trait":"line","curve":60,"color":"BEB86C"},{"x":-1158,"y":607,"bCoef":-2.45,"cMask":["ball"],"trait":"line","curve":0,"color":"BEB86C"},{"x":-1187,"y":578,"bCoef":-2.45,"cMask":["ball"],"trait":"line","curve":-60,"color":"BEB86C"},{"x":-1158,"y":-607,"bCoef":-2.45,"cMask":["ball"],"trait":"line","curve":0,"color":"BEB86C"},{"x":-1187,"y":-578,"bCoef":-2.45,"cMask":["ball"],"trait":"line","curve":60,"color":"BEB86C"},{"x":-1190,"y":-255,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":-1180,"y":-255,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":-1190,"y":-155,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":-1180,"y":-155,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":-1190,"y":155,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":-1180,"y":155,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":-1190,"y":255,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":-1180,"y":255,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":1190,"y":-255,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":1180,"y":-255,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":1190,"y":-155,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":1180,"y":-155,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":1190,"y":255,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":1180,"y":255,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":1190,"y":155,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":1180,"y":155,"bCoef":-1,"cMask":["ball"],"trait":"line","color":"000000","curve":0},{"x":-1148,"y":-525,"trait":"line","curve":-90,"color":"5E844D"},{"x":1148,"y":-525,"trait":"line","color":"5E844D"},{"x":-1148,"y":525,"trait":"line","curve":-90,"color":"5E844D"},{"x":1148,"y":525,"trait":"line","color":"5E844D"},{"x":-1150,"y":-260,"trait":"line","curve":-100,"color":"5E844D"},{"x":-840,"y":-600,"trait":"line","color":"5E844D","curve":-100},{"x":-1150,"y":260,"trait":"line","curve":100,"color":"5E844D"},{"x":-840,"y":600,"trait":"line","color":"5E844D","curve":100},{"x":-840,"y":-1150,"trait":"line","color":"5E844D","curve":-100},{"x":1150,"y":-260,"trait":"line","curve":100,"color":"5E844D"},{"x":840,"y":-600,"trait":"line","color":"5E844D","curve":100},{"x":1150,"y":260,"trait":"line","curve":-100,"color":"5E844D"},{"x":840,"y":600,"trait":"line","color":"5E844D","curve":-100}],"segments":[{"v0":37,"v1":39,"curve":5,"color":"ffffff","trait":"reargoalNetleft","x":-1210},{"v0":41,"v1":43,"curve":-5,"color":"ffffff","trait":"reargoalNetright"},{"v0":4,"v1":5,"trait":"line","y":250},{"v0":5,"v1":7,"trait":"line","x":840},{"v0":6,"v1":7,"trait":"line","y":-250},{"v0":8,"v1":9,"trait":"line","y":150},{"v0":9,"v1":11,"trait":"line","x":1030},{"v0":10,"v1":11,"trait":"line","y":-150},{"v0":12,"v1":13,"curve":-130,"trait":"line","x":840},{"v0":14,"v1":15,"trait":"line","y":-250},{"v0":15,"v1":17,"trait":"line","x":-840},{"v0":16,"v1":17,"trait":"line","y":250},{"v0":18,"v1":19,"trait":"line","y":-150},{"v0":19,"v1":21,"trait":"line","x":-1030},{"v0":20,"v1":21,"trait":"line","y":150},{"v0":22,"v1":23,"curve":-130,"trait":"line","x":-840},{"v0":24,"v1":25,"curve":-180,"trait":"line","x":935},{"v0":26,"v1":27,"curve":-180,"trait":"line","x":-935},{"v0":24,"v1":25,"curve":180,"trait":"line","x":935},{"v0":26,"v1":27,"curve":180,"trait":"line","x":-935},{"v0":24,"v1":25,"curve":90,"trait":"line","x":935},{"v0":26,"v1":27,"curve":90,"trait":"line","x":-935},{"v0":24,"v1":25,"curve":-90,"trait":"line","x":935},{"v0":26,"v1":27,"curve":-90,"trait":"line","x":-935},{"v0":24,"v1":25,"trait":"line","x":935},{"v0":26,"v1":27,"trait":"line","x":-935},{"v0":28,"v1":29,"curve":90,"bCoef":0,"cMask":["wall"],"trait":"line"},{"v0":30,"v1":31,"curve":90,"bCoef":0,"cMask":["wall"],"trait":"line"},{"v0":32,"v1":33,"curve":90,"bCoef":0,"cMask":["wall"],"trait":"line"},{"v0":34,"v1":35,"curve":90,"bCoef":0,"cMask":["wall"],"trait":"line"},{"v0":36,"v1":37,"curve":5,"color":"ffffff","trait":"sidegoalNet"},{"v0":38,"v1":39,"curve":-5,"color":"ffffff","trait":"sidegoalNet"},{"v0":40,"v1":41,"curve":-5,"color":"ffffff","trait":"sidegoalNet"},{"v0":42,"v1":43,"curve":5,"color":"ffffff","trait":"sidegoalNet"},{"v0":44,"v1":45,"curve":-180,"trait":"line"},{"v0":46,"v1":47,"curve":180,"trait":"line"},{"v0":44,"v1":45,"curve":-90,"trait":"line"},{"v0":46,"v1":47,"curve":90,"trait":"line"},{"v0":48,"v1":49,"color":"ffffff","trait":"line"},{"v0":50,"v1":51,"color":"ffffff","trait":"line"},{"v0":52,"v1":53,"color":"ffffff","trait":"line"},{"v0":54,"v1":55,"color":"ffffff","trait":"line"},{"v0":56,"v1":57,"curve":40,"vis":true,"color":"BEB86C","bCoef":-4.7,"cMask":["ball"],"trait":"line","x":-1220},{"v0":58,"v1":59,"curve":-40,"vis":true,"color":"BEB86C","bCoef":-4.7,"cMask":["ball"],"trait":"line","x":1220},{"v0":60,"v1":61,"curve":-40,"vis":true,"color":"BEB86C","bCoef":-4.7,"cMask":["ball"],"trait":"line","x":-1220},{"v0":62,"v1":63,"curve":40,"vis":true,"color":"BEB86C","bCoef":-4.7,"cMask":["ball"],"trait":"line","x":1220},{"v0":64,"v1":65,"curve":-60,"vis":true,"color":"BEB86C","bCoef":-2.45,"cMask":["ball"],"trait":"line"},{"v0":66,"v1":67,"curve":60,"vis":true,"color":"BEB86C","bCoef":-2.45,"cMask":["ball"],"trait":"line"},{"v0":68,"v1":69,"curve":-60,"vis":true,"color":"BEB86C","bCoef":-2.45,"cMask":["ball"],"trait":"line"},{"v0":70,"v1":71,"curve":60,"vis":true,"color":"BEB86C","bCoef":-2.45,"cMask":["ball"],"trait":"line"},{"v0":0,"v1":1,"trait":"kickOffBarrier"},{"v0":1,"v1":2,"curve":180,"cGroup":["blueKO"],"trait":"kickOffBarrier"},{"v0":1,"v1":2,"curve":-180,"cGroup":["redKO"],"trait":"kickOffBarrier"},{"v0":2,"v1":3,"trait":"kickOffBarrier"},{"v0":72,"v1":73,"curve":0,"vis":true,"color":"000000","bCoef":-1,"cMask":["ball"],"trait":"line"},{"v0":74,"v1":75,"curve":0,"vis":true,"color":"000000","bCoef":-1,"cMask":["ball"],"trait":"line"},{"v0":76,"v1":77,"curve":0,"vis":true,"color":"000000","bCoef":-1,"cMask":["ball"],"trait":"line"},{"v0":78,"v1":79,"curve":0,"vis":true,"color":"000000","bCoef":-1,"cMask":["ball"],"trait":"line"},{"v0":80,"v1":81,"curve":0,"vis":true,"color":"000000","bCoef":-1,"cMask":["ball"],"trait":"line"},{"v0":82,"v1":83,"curve":0,"vis":true,"color":"000000","bCoef":-1,"cMask":["ball"],"trait":"line"},{"v0":84,"v1":85,"curve":0,"vis":true,"color":"000000","bCoef":-1,"cMask":["ball"],"trait":"line"},{"v0":86,"v1":87,"curve":0,"vis":true,"color":"000000","bCoef":-1,"cMask":["ball"],"trait":"line"},{"v0":88,"v1":89,"color":"5E844D","trait":"line","y":-475},{"v0":90,"v1":91,"color":"5E844D","trait":"line","y":-475},{"v0":92,"v1":93,"curve":-100,"color":"5E844D","trait":"line","y":-475},{"v0":94,"v1":95,"curve":100,"color":"5E844D","trait":"line","y":-475},{"v0":97,"v1":98,"curve":100,"color":"5E844D","trait":"line","y":-475},{"v0":99,"v1":100,"curve":-100,"color":"5E844D","trait":"line","y":-475}],"goals":[{"p0":[-1160,-124],"p1":[-1160,124],"team":"red"},{"p0":[1160,124],"p1":[1160,-124],"team":"blue"}],"discs":[{"pos":[-1150,127],"color":"FF0000","bCoef":0.5,"trait":"goalPost"},{"pos":[-1150,-127],"color":"FF0000","bCoef":0.5,"trait":"goalPost"},{"pos":[1150,127],"color":"0000FF","bCoef":0.5,"trait":"goalPost"},{"pos":[1150,-127],"color":"0000FF","bCoef":0.5,"trait":"goalPost"},{"pos":[-1250,150],"color":"FF0000","trait":"stanchion"},{"pos":[-1250,-150],"color":"FF0000","trait":"stanchion"},{"pos":[1250,150],"color":"0000FF","trait":"stanchion","x":1250},{"pos":[1250,-150],"color":"0000FF","trait":"stanchion","x":1250},{"radius":2,"invMass":0,"pos":[-1150,-600],"color":"FFFFFF","bCoef":-0.1,"cMask":["ball"],"trait":"goalPost"},{"radius":2,"invMass":0,"pos":[-1150,600],"color":"FFFFFF","bCoef":-0.1,"cMask":["ball"],"trait":"goalPost"},{"radius":2,"invMass":0,"pos":[1150,-600],"color":"FFFFFF","bCoef":-0.1,"cMask":["ball"],"trait":"goalPost"},{"radius":2,"invMass":0,"pos":[1150,600],"color":"FFFFFF","bCoef":-0.1,"cMask":["ball"],"trait":"goalPost"}],"planes":[{"normal":[0,1],"dist":-635,"bCoef":0,"trait":"ballArea","_data":{"extremes":{"normal":[0,1],"dist":-635,"canvas_rect":[-1300,-1150,1300,700],"a":[-1300,-635],"b":[1300,-635]}}},{"normal":[0,-1],"dist":-635,"bCoef":0,"trait":"ballArea","_data":{"extremes":{"normal":[0,-1],"dist":-635,"canvas_rect":[-1300,-1150,1300,700],"a":[-1300,635],"b":[1300,635]}}},{"normal":[0,1],"dist":-670,"bCoef":0,"_data":{"extremes":{"normal":[0,1],"dist":-670,"canvas_rect":[-1300,-1150,1300,700],"a":[-1300,-670],"b":[1300,-670]}}},{"normal":[0,-1],"dist":-670,"bCoef":0,"_data":{"extremes":{"normal":[0,-1],"dist":-670,"canvas_rect":[-1300,-1150,1300,700],"a":[-1300,670],"b":[1300,670]}}},{"normal":[1,0],"dist":-1300,"bCoef":0,"_data":{"extremes":{"normal":[1,0],"dist":-1300,"canvas_rect":[-1300,-1150,1300,700],"a":[-1300,-1150],"b":[-1300,700]}}},{"normal":[-1,0],"dist":-1300,"bCoef":0.1,"_data":{"extremes":{"normal":[-1,0],"dist":-1300,"canvas_rect":[-1300,-1150,1300,700],"a":[1300,-1150],"b":[1300,700]}}},{"normal":[1,0],"dist":-1214,"bCoef":0,"cMask":["ball"],"_data":{"extremes":{"normal":[1,0],"dist":-1214,"canvas_rect":[-1300,-1150,1300,700],"a":[-1214,-1150],"b":[-1214,700]}}},{"normal":[-1,0],"dist":-1214,"bCoef":0,"cMask":["ball"],"_data":{"extremes":{"normal":[-1,0],"dist":-1214,"canvas_rect":[-1300,-1150,1300,700],"a":[1214,-1150],"b":[1214,700]}}}],"traits":{"ballArea":{"vis":false,"bCoef":0,"cMask":["ball"]},"goalPost":{"radius":5,"invMass":0,"bCoef":2},"stanchion":{"radius":3,"invMass":0,"bCoef":3,"cMask":["none"]},"cornerflag":{"radius":3,"invMass":0,"bCoef":0.5,"color":"FFFF00","cGroup":[]},"reargoalNetleft":{"vis":true,"bCoef":0.1,"cMask":["ball","red","blue"],"curve":10,"color":"C7E6BD"},"reargoalNetright":{"vis":true,"bCoef":0.1,"cMask":["ball","red","blue"],"curve":-10,"color":"C7E6BD"},"sidegoalNet":{"vis":true,"bCoef":1,"cMask":["ball","red","blue"],"color":"C7E6BD"},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]},"line":{"vis":true,"cMask":[],"color":"C7E6BD"},"tunnel":{"vis":true,"cMask":["red","blue"],"color":"000000"},"advertising":{"vis":true,"cMask":["red","blue"],"color":"333333"},"teambench":{"vis":true,"cMask":[],"color":"000000"},"manager":{"radius":15,"vis":true,"cMask":["red","blue"],"invMass":0,"color":"333333"},"physio":{"radius":15,"vis":true,"cMask":["red","blue"],"invMass":0,"color":"666666"},"redsubs":{"radius":15,"vis":true,"cMask":["red","blue"],"invMass":0,"color":"E56E56"},"bluesubs":{"radius":15,"vis":true,"cMask":["red","blue"],"invMass":0,"color":"5689E5"}},"ballPhysics":{"invMass":1.05,"radius":8},"joints":[],"redSpawnPoints":[],"blueSpawnPoints":[],"canBeStored":false}`;
//Functions
function updateAdmins() {
    // Get all players except the host (id = 0 is always the host)
    var players = room.getPlayerList().filter((player) => player.id != 0 );
    if ( players.length == 0 ) return; // No players left, do nothing.
    if ( players.find((player) => player.admin) != null ) return; // There's an admin left so do nothing.
    room.setPlayerAdmin(players[0].id, true); // Give admin to the first non admin player in the list
  }
function clonekick(player) {
    players = room.getPlayerList();
    for (i = 0; i < players.length - 1; i++) {
        if (player.name == players[i].name) {
            room.kickPlayer(player.id, "❌A Player With This Name Already Exists", false);
        }
    }
}
function getTime(scores) {
    // returns the current time of the game
    return (
        '[' +
        Math.floor(Math.floor(scores.time / 60) / 10).toString() +
        Math.floor(Math.floor(scores.time / 60) % 10).toString() +
        ':' +
        Math.floor(
            Math.floor(scores.time - Math.floor(scores.time / 60) * 60) / 10
        ).toString() +
        Math.floor(
            Math.floor(scores.time - Math.floor(scores.time / 60) * 60) % 10
        ).toString() +
        ']'
    );
}
var isOwnGoal = (team, player) => team != player.team ? " 😂Own Goal" : "";
function updatePlayersPositions() {
    let players = room.getPlayerList().filter(player => player.id !== 0);
    players = players.filter(player => player.team !== 0);

    for (i = 0; i < players.length; i++) {
        if (players[i].position != null) {
            let currentPositionYY = players[i].position.y;
            let currentPositionXX = players[i].position.x;
            let currentPositionYYShort = currentPositionYY.toFixed(8);
            let currentPositionXXShort = currentPositionXX.toFixed(8);
            previousPositionsX[players[i].id] = currentPositionXXShort;
            previousPositionsY[players[i].id] = currentPositionYYShort;
        }
    }
};

function updateMessage() {
    let players = room.getPlayerList().filter(player => player.id !== 0);
    players = players.filter(player => player.team !== 0);

    for (i = 0; i < players.length; i++) {
        if (players[i].position != null) {
            let currentPositionY = players[i].position.y;
            let currentPositionX = players[i].position.x;
            let currentPositionYShort = currentPositionY.toFixed(8);
            let currentPositionXShort = currentPositionX.toFixed(8);
            if (currentPositionYShort != previousPositionsY[players[i].id] || currentPositionXShort != previousPositionsY[players[i].id]) {
                playerMoving = true;
                //room.sendChat("x" +currentPositionXShort);
            } else if (currentPositionYShort == previousPositionsY[players[i].id] && currentPositionXShort == previousPositionsX[players[i].id]) {
                playerMoving = false;
                //room.sendChat(playerMoving + " false");
            }
		if(isLineUp = true){
			if (currentPositionXShort == "-144.00000000") {
                room.setPlayerAvatar(players[i].id, "1")
                redTeam[0] = players[i].name
            } else if (currentPositionXShort == "-141.00000000") {
                room.setPlayerAvatar(players[i].id, "3")
                redTeam[1] = players[i].id
            } else if (currentPositionXShort == "-136.00000000") {
                room.setPlayerAvatar(players[i].id, "6")
                redTeam[2] = players[i].id
            } else if (currentPositionXShort == "-186.00000000") {
                room.setPlayerAvatar(players[i].id, "8")
                redTeam[3] = players[i].id
            } else if (currentPositionXShort == "-106.00000000") {
                room.setPlayerAvatar(players[i].id, "10")
                redTeam[4] = players[i].id
            } else if (currentPositionXShort == "-147.00000000") {
                room.setPlayerAvatar(players[i].id, "9")
                redTeam[5] = players[i].id
            } 
            if (currentPositionXShort == "144.00000000") {
                room.setPlayerAvatar(players[i].id, "1")
                blueTeam[0] = players[i].name
            } else if (currentPositionXShort == "139.00000000") {
                room.setPlayerAvatar(players[i].id, "3")
                blueTeam[1] = players[i].id
            } else if (currentPositionXShort == "134.00000000") {
                room.setPlayerAvatar(players[i].id, "6")
                blueTeam[2] = players[i].id
            } else if (currentPositionXShort == "184.00000000") {
                room.setPlayerAvatar(players[i].id, "8")
                blueTeam[3] = players[i].id
            } else if (currentPositionXShort == "104.00000000") {
                room.setPlayerAvatar(players[i].id, "10")
                blueTeam[4] = players[i].id
            } else if (currentPositionXShort == "149.00000000") {
                room.setPlayerAvatar(players[i].id, "9")
                blueTeam[5] = players[i].id
            }
		}
            
        }
    }
};


let updateMessageInterval = setInterval(updateMessage, 1000);
let updatePlayersPositionsInterval = setInterval(updatePlayersPositions, 300);
function isOutsideStadium2(ballPosition2) { if (ballPosition2.y < -83.5 || ballPosition2.y > 83.5) { return ballPosition2.x > 700 || ballPosition2.x < -700 || ballPosition2.y > 320 || ballPosition2.y < -320; } }

var isBallOutsideStadium2 = false;

function checkBallPosition2() {
    for (let i = 0; i <= room.getDiscCount(); i++) {
        let disc = room.getDiscProperties(i);
        var ballPosition2 = room.getBallPosition();
        if (realMap2 == true) {
            if (isOutsideStadium2(ballPosition2)) {
                ballOut2 = true;
                if (!isBallOutsideStadium2) {
                    isBallOutsideStadium2 = true;
                    exitingPos3 = ballPosition2.x;
                    exitingPos4 = ballPosition2.y;
                    var totalScores = room.getScores().red + room.getScores().blue;
                    if (lastScores != totalScores) {
                        lastScores = totalScores;
                        return false;
                    }
                    if (ballPosition2.x > 700 && lastTeamTouched == Team.RED && disc.radius == 9.9 || ballPosition2.x < -700 && lastTeamTouched == Team.BLUE && disc.radius == 9.9) {

                        lastCall2 = lastTeamTouched == Team.RED ? "2" : "1";

                        if (ballPosition2.x < 0 && ballPosition2.y < 0) { BallPosition2(-750, -195, 0, 0) }
                        if (ballPosition2.x < 0 && ballPosition2.y > 0) { BallPosition2(-750, 195, 0, 0) }
                        if (ballPosition2.x > 0 && ballPosition2.y > 0) { BallPosition2(750, 195, 0, 0) }
                        if (ballPosition2.x > 0 && ballPosition2.y < 0) { BallPosition2(750, -195, 0, 0) }
                        setBallColor2(lastCall2 == 1 ? 0xFF0000 : 0x0000FF);
                        room.sendAnnouncement("[⚽] AUT!", null, 0x00FF6E, "normal", 1);



                    } else if (ballPosition2.x > 700 && lastTeamTouched == Team.BLUE && disc.radius == 9.9 || ballPosition2.x < -700 && lastTeamTouched == Team.RED && disc.radius == 9.9) {

                        lastCall2 = lastTeamTouched == Team.RED ? "2" : "1";

                        if (ballPosition2.x < 0 && ballPosition2.y < 0) { BallPosition2(-745, -330, 0, 0) }
                        if (ballPosition2.x < 0 && ballPosition2.y > 0) { BallPosition2(-745, 330, 0, 0) }
                        if (ballPosition2.x > 0 && ballPosition2.y > 0) { BallPosition2(745, 330, 0, 0) }
                        if (ballPosition2.x > 0 && ballPosition2.y < 0) { BallPosition2(745, -330, 0, 0) }
                        setBallColor2(lastCall2 == 1 ? 0xFF0000 : 0x0000FF);
                        room.sendAnnouncement("[🚩] KORNER", null, 0x00FF6E, "normal", 1);

                    }
                }
            } else {
                if (ballOut2 == true) { setBallColor2(0xFFDD00); }
                isBallOutsideStadium2 = false;
                backMSG = true;
                ballOut2 = false;

            }
        }
        return true;
    }

}

function BallPosition2(e, f, g, h) {
    for (let i = 0; i <= room.getDiscCount(); i++) {
        let disc = room.getDiscProperties(i);

        if (disc && disc.radius == 9.9) {
            room.setDiscProperties(i, { x: e, y: f });
            room.setDiscProperties(i, { xspeed: g, yspeed: h });
        }
    }
}


function setBallColor2(c) {
    for (let i = 0; i <= room.getDiscCount(); i++) {
        let disc = room.getDiscProperties(i);

        if (disc && disc.radius == 9.9) {
            room.setDiscProperties(i, { color: c });

        }
    }
}
function isOutsideStadium(ballPosition) { if (ballPosition.y < -127 || ballPosition.y > 127) { return ballPosition.x > stadiumWidth || ballPosition.x < -stadiumWidth || ballPosition.y > stadiumHeight || ballPosition.y < -stadiumHeight; } }

var isBallOutsideStadium = false;

function checkBallPosition() {
    var ballPosition = room.getBallPosition();
    if (realMap == true) {
        if (isOutsideStadium(ballPosition)) {
            ballOut = true;
            if (!isBallOutsideStadium) {
                isBallOutsideStadium = true;
                exitingPos = ballPosition.x;
                exitingPos2 = ballPosition.y;
                var totalScores = room.getScores().red + room.getScores().blue;
                if (lastScores != totalScores) {
                    lastScores = totalScores;
                    return false;
                }
                if (ballPosition.x > stadiumWidth && lastTeamTouched == Team.RED || ballPosition.x < -stadiumWidth && lastTeamTouched == Team.BLUE) {

                    lastCall = lastTeamTouched == Team.RED ? "2" : "1";

                    if (ballPosition.x < 0 && ballPosition.y < 0) { BallPosition(-1200, -210, 0, 0) }
                    if (ballPosition.x < 0 && ballPosition.y > 0) { BallPosition(-1200, 210, 0, 0) }
                    if (ballPosition.x > 0 && ballPosition.y > 0) { BallPosition(1200, 210, 0, 0) }
                    if (ballPosition.x > 0 && ballPosition.y < 0) { BallPosition(1200, -210, 0, 0) }
                    setBallColor(lastCall == 1 ? 0xFF0000 : 0x0000FF);
                    room.sendAnnouncement("[⚽] Goal Kick", null, 0x00FF6E, "normal", 1);



                } else if (ballPosition.x > stadiumWidth && lastTeamTouched == Team.BLUE || ballPosition.x < -stadiumWidth && lastTeamTouched == Team.RED) {

                    lastCall = lastTeamTouched == Team.RED ? "2" : "1";

                    if (ballPosition.x < 0 && ballPosition.y < 0) { BallPosition(-1197, -615, 0, 0) }
                    if (ballPosition.x < 0 && ballPosition.y > 0) { BallPosition(-1197, 615, 0, 0) }
                    if (ballPosition.x > 0 && ballPosition.y > 0) { BallPosition(1197, 615, 0, 0) }
                    if (ballPosition.x > 0 && ballPosition.y < 0) { BallPosition(1197, -615, 0, 0) }
                    setBallColor(lastCall == 1 ? 0xFF0000 : 0x0000FF);
                    room.sendAnnouncement("[🚩] Corner Kick", null, 0x00FF6E, "normal", 1);

                } else {

                    isBallKickedOutside = false;
                    room.sendAnnouncement(lastTeamTouched == Team.RED ? "          🔵 🔵 🔵           [B] BLUE           🔵 🔵 🔵" : "          🔴 🔴 🔴           [R] RED           🔴 🔴 🔴", null, 0xbbff45, 'normal', 2);
                    lastCall = lastTeamTouched == Team.RED ? "2" : "1";
                    setBallColor(lastCall == 1 ? 0xFF0000 : 0x0000FF);
                    if (exitingPos2 > 0) { BallPosition(exitingPos, exitingPos2 + 17.5, 0, 0); }
                    if (exitingPos2 < 0) { BallPosition(exitingPos, exitingPos2 - 17.5, 0, 0); }


                }

            }
        } else {
            if (ballOut == true) { setBallColor(0xFFFFFF); }
            isBallOutsideStadium = false;
            backMSG = true;
            ballOut = false;

        }
        return true;
    }

}
function gameWinned(){
    stats = JSON.parse(localStorage.getItem(auth));
    stats[1] += 1;
    stats[5] += 3;
    localStorage.setItem(auth, JSON.stringify(stats));
}
function gameLosed(){
    stats = JSON.parse(localStorage.getItem(auth));
    stats[2] += 1;
    stats[5] -= 2;
    localStorage.setItem(auth, JSON.stringify(stats));
}
function  sendChatForTeam(str, team) {
    room.getPlayerList().filter(x => x.team == team || x.admin==true).forEach(p => {
    room.sendAnnouncement(str, p.id, team == 1 ? 0xFF4640 : (team == 2 ? 0x089CFF : 0x808080), "bold");
    });
}
function pointDistance(p1, p2) {
    var d1 = p1.x - p2.x;
    var d2 = p1.y - p2.y;
    return Math.sqrt(d1 * d1 + d2 * d2);
}
function checkBall(){
    var ballPosition = room.getBallPosition();
    point[1] = point[0];
    point[0] = ballPosition;
    ballSpeed = (pointDistance(point[0], point[1]) * 60 * 60 * 60) / 15000;
}
function sendDiscordLink(player) {
    room.sendAnnouncement("                                        ▒█▀▀▄ ▀█▀ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▄ ", player, 0x9250FD, "normal", 0)
    room.sendAnnouncement("                                        ▒█░▒█ ▒█░ ░▀▀▀▄▄ ▒█░░░ ▒█░░▒█ ▒█▄▄▀ ▒█░▒█ ", player, 0x8466FD, "normal", 0)
    room.sendAnnouncement("                                        ▒█▄▄▀ ▄█▄ ▒█▄▄▄█ ▒█▄▄█ ▒█▄▄▄█ ▒█░▒█ ▒█▄▄▀ ", player, 0x7B73FD, "normal", 0);
    room.sendAnnouncement("                                        💬 Discord Link: ➡ https://discord.gg/ ⬅", player, 0xF6FF43, "normal", 0);
}
function setBallColor(c) {
    for (let i = 0; i <= room.getDiscCount(); i++) {
        let disc = room.getDiscProperties(i);

        if (disc && disc.radius == disc.radius) {
            room.setDiscProperties(0, { color: c });

        }
    }
}

function SendBanAnnouncement(byPlayer,banned,reason){
    //sending ban announcement with an embed message to a discord channel
    var request = new XMLHttpRequest();
    request.open("POST", sendBanWebhookUrl);
    // again, replace the url in the open method with yours
    request.setRequestHeader('Content-type', 'application/json');

    if(reason == ""){
        reason = " - "
    }
    var myEmbed = {
    author: {
        name: "Ban Announcement"
    },
    title: "🚫Banned Player: " + banned.name + " 🚫",
    description: "Banned By: " + byPlayer.name + " - Reason: " + reason,
    color: hexToDecimal("#ff0000")//type here a hex colors that you want (#ff0000 is red)
}

var params = {
    username: "⛔️Ban Announcement⛔️",
    embeds: [ myEmbed ]
}

request.send(JSON.stringify(params));

// function that converts a color HEX to a valid Discord color
function hexToDecimal(hex) {
  return parseInt(hex.replace("#",""), 16)
}

}
function SendLink(link){
    var request = new XMLHttpRequest();
    request.open("POST", sendLinkWebhookURL);
    // again, replace the url in the open method with yours
    request.setRequestHeader('Content-type', 'application/json');
    if(roomPublic == true){
        visible = "✅";
    }else {
        visible = "❌";
    }
    var myEmbed = {
    author: {
        name: "Room Link"
    },
    title: "🔅Room Announcement: ",
    description: `🏠Room Name ${roomName} \n 👥Max Players: ${maxPlayers} \n 📢Visible In Room List: ${visible}`,
    color: hexToDecimal("#ff0000")//type here a hex colors that you want (#ff0000 is red)
}

var params = {
    username: "⚠️Room Announcement⚠️",
    embeds: [ myEmbed ]
}

request.send(JSON.stringify(params));

// function that converts a color HEX to a valid Discord color
function hexToDecimal(hex) {
  return parseInt(hex.replace("#",""), 16)
}

}
function Blocked(msg) {
    if (blockedWords.includes(msg)) {
        return true;
    } else return false;
}
setInterval(() => {
	var players = room.getPlayerList();
	for (i = 0; i < players.length; i++) {
		if (players[i].position != null && kickOff == true) {
			playersAfk[players[i].name]++;
			if(playersAfk[players[i].name] == 4)
				room.sendAnnouncement("❌ Hey " + players[i].name + ", İf You Dont Move You Will Get Kicked After 6 Seconds!", null, colors.red, "normal", 2);
			else if(playersAfk[players[i].name] == 10)
				room.kickPlayer(players[i].id, "💤 𝐀𝐅𝐊.", false);
		}
		else
			playersAfk[players[i].name] = 0;
	}
}, 1000);
function BallPosition(a, b, c, d) {
    for (let i = 0; i <= room.getDiscCount(); i++) {
        let disc = room.getDiscProperties(i);

        if (disc && disc.radius == 8) {
            room.setDiscProperties(0, { x: a, y: b });
            room.setDiscProperties(0, { xspeed: c, yspeed: d });
        }
    }
}
function afkFun(player, message){ // !classic
    if(player.team == Team.SPECTATORS){
        if (afkPlayerIDs.has(player.id)){
            afkPlayerIDs.delete(player.id);
            room.sendChat("🔆 " + player.name + " Is Not 𝐀𝐅𝐊 Anymore!");
        }else {
            afkPlayerIDs.add(player.id);
            room.setPlayerTeam(player.id, 0);
            room.sendAnnouncement("[💤] " + player.name + " is Now 𝐀𝐅𝐊", null, 0xff8400, 'normal', 2);
        }
    }else {
        room.sendAnnouncement("❌[PM]You Can't Go AFK While İn Game",player.id,colors.red,'bold',2);
    }
    
}
function sendPm(player, message){ //!pv
    var pm = message.substr(4);
    var index = message.split(" ").slice(1);
    var playerID = index[0]
    var message2 = message.substr(5);
    var message3 = "[ ID: " + player.id + " - 🔒💬] " + player.name + ":" + message2;
    console.log(playerID);
    console.log(index);
    console.log(message);
    console.log(message2);
    console.log(message3);
    room.sendAnnouncement(message3, parseInt(playerID), 0x8271ff, "normal", 2);
    var players = room.getPlayerList().filter((player) => player.id != 0 );
    if ( players.find((player => player.id === playerID))) {room.sendAnnouncement("❌ That User ID does not work!, Type # to see the player ID.", player.id, 0x19FF85, "normal", 0);}
    else {room.sendAnnouncement("[📨] Private Message Successfully Sended! ✅", player.id, 0x19FF85, "normal", 0);};
    return false;
}
function getRandomInt(max) {
    // returns a random number from 0 to max-1
    return Math.floor(Math.random() * Math.floor(max));
}
function GetPlayer(id){
    for(var i=0; i<PlayerList.length; i++){
	if(PlayerList[i].id==id){
	    return PlayerList[i];
	}
    }
}
function CreatePlayer(player){
    PlayerList[PlayerList.length]={
	name:player.name,
	id:player.id,
	auth:undefined,
	conn:undefined,
    inroom:true,
	jointime:0
    };
}

function DeletePlayer(id){
    for(var i=0; i<PlayerList.length; i++){
	if(PlayerList[i].id==id){
	    PlayerList.splice(i,1);
	}
    }
}
function chatLog(message) {

    var request = new XMLHttpRequest();
    request.open("POST", chatLogWebhookURL);

    request.setRequestHeader('Content-type', 'application/json');

    var params = {
        avatar_url: '',
        username: 'Chat Log',
        content: message
    };

    request.send(JSON.stringify(params));
}
let roomNameString = roomName;
let RecSistem = {
    getCustomDate: ()=>{
        let
        data = new Date().toLocaleDateString().split("/").join("-"),
        relogio = new Date().toLocaleTimeString().split(":");

        return `${data}-${relogio[0]}h${relogio[1]}m`;
    },
    getScoresTime: time=>{
        return ~~(Math.trunc(time) / 60) + ":" + (Math.trunc(time)%60).toString().padStart(2, '0');
    },
    sendDiscordWebhook: scores=>{
        let
        red = room.getPlayerList().filter((player)=>player.team == 1).map((player)=> player.name),
        blue = room.getPlayerList().filter((player)=>player.team == 2).map((player)=> player.name);

        let form = new FormData();
        form.append(null, new File( [room.stopRecording()], `HBReplay-${RecSistem.getCustomDate()}.hbr2`, {"type": "text/plain"} ));
        form.append("payload_json", JSON.stringify(RecSistem.getParams(scores, red, blue)));

        let xhr = new XMLHttpRequest();
        xhr.open("POST", sendRecWebhookURL);
        xhr.send(form);
    },
    getParams: (scores, red, blue)=>{
        let params = {
          "username": "Match Record",
          "avatar_url": "",//Avatar Url Of The Bot
          "content": "",
          "embeds": [{
            "title": "",
            "color": 2078513,
            "description": "",
            "timestamp": null,
            "author": { "name": roomNameString },
            "image": {},
            "thumbnail": {},
            "footer": {
                "text": `Match Record - Statistics`,
                "icon_url": ""
            },
            "fields": [
            { "name": "🔴RED", "value": `${red.join("\n")}\n**⚽Goals**\n${scores.red}`, "inline": true },
            { "name": "🔵BLUE", "value": `${blue.join("\n")}\n**⚽Goals**\n${scores.blue}`, "inline": true },
            { "name": "🕐Time", "value": RecSistem.getScoresTime(scores.time) }
            ]
        }],
        "components": []
    };
    return params;
}

};

function callAdmin(message) {

    var request = new XMLHttpRequest();
    request.open("POST", adminWebhookURL);

    request.setRequestHeader('Content-type', 'application/json');

    var params = {
        avatar_url: '',
        username: 'Call For Admins',
        content: message
    };

    request.send(JSON.stringify(params));
}
var playerCount = 0; //number of players in the room (without bot)
var admin = [""]; //auth's of admins
var bannedPlayers = [""]//auth's of banned players
var vipPlayers = [""];//auth's of vip players
var adminList = new Set();
var vipList = new Set();
var banList = [""];
var BanListForChat = [];
var PlayerAuth= {};
var PlayerConn= {};
var joinLimit = maxPlayers;
room.onPlayerJoin = function(player){
    for (var i in PlayerAuth) {
        //checking by using auth
        if(PlayerAuth[i].auth == player.auth){
            room.kickPlayer(PlayerAuth[i].id, "❌Tab detection is blocked. Don't! Your tab in the room: " + player.name, false);
        }   
    }
    PlayerAuth[player.auth] = player;
    for (var i in PlayerConn) {
        //checking by using conn
        if(PlayerConn[i].conn == player.conn){
            room.kickPlayer(PlayerConn[i].id, "❌Tab detection is blocked. Don't! Your tab in the room: " + player.name, false);
        }   
    }
    PlayerConn[player.conn] = player;
    /*if(bannedPlayers.includes(player.auth)){
        banList.push(player.auth);
    }*/
    
    if(player.name.startsWith(" ") == true || player.name.endsWith(" ") == true){
        room.kickPlayer(player.id,"❌There Should Be No Spaces To The Right Or Left Of Your Name.",false);
    }
    //banList = JSON.parse(localStorage.getItem("banlist"));
    /*if(banList == null || banList == undefined || banList == ""){
        banList = [];
        
    }
    if (banList.includes(player.auth)){
        room.kickPlayer(player.id, "✖️You Are Perma Banned✖️",true)
    };*/
    var seconds = 300;//Type here how many seconds you want to send a message
    setInterval(function () {sendDiscordLink();}, seconds*1000);
    CreatePlayer(player);
    GetPlayer(player.id).auth = player.auth;
    GetPlayer(player.id).conn = player.conn;
    GetPlayer(player.id).inroom = true;
    auth = player.auth
    stats = JSON.parse(localStorage.getItem(player.auth));
    if(stats == null || stats == undefined || stats == ""){
        stats = [0,0,0,0,0,0,1,player.name,0]
        localStorage.setItem(player.auth, JSON.stringify(stats));
    }
    stats = JSON.parse(localStorage.getItem(auth));
    if(stats[8] == 1){
        room.kickPlayer(player.id, "✖️You Are Perma Banned✖️",true)
    }else {
        //nothing
    }
    //  updateAdmins(); 
    if(vipPlayers.includes(player.auth)){
        vipList.add(player.id);
    }if(admin.includes(player.auth)){
        adminList.add(player.id);
    }
    if(room.getPlayerList().length == joinLimit-1){
        if(adminList.has(player.id) == false){
            if(vipList.has(player.id) == false){
                room.kickPlayer(player.id, "✖️The last place is reserved for Admins and VIPs.");
            }
        }
        
    }
    console.log(PlayerList)
    room.sendAnnouncement("Hi, "+player.name+", Commands 🔴!dc 🟠!admin 🟡!help",null,0xfffff,'bold',2)
    
    clonekick(player);//kicks the second player that he has same name with a diffrent player
    if(admin.includes(player.auth)){
        room.setPlayerAdmin(player.id,true);
        room.sendAnnouncement("You Logged İn As An Admin",player.id,colors.orange,'italic',1);
    };
    
    
    console.log("🕑"+new Date().getHours() + ":" + new Date().getMinutes()+"]"+"📈 "+player.name + " Has Joined To The Room - Auth: " + player.auth + " | Conn: "+ player.conn);

}
room.onRoomLink = function(url){
    room.setTeamColors(1, 60, 0xFFFFFF, [0xFF0800, 0xFF0800, 0xFF0800]);
    room.setTeamColors(2, 180, 0xFFFFFF, [0x0082E1, 0x0C161E, 0x0082E1]);
    SendLink(url)
}

var vipColor = 0xfffff;//color for vip players in chat
var adminColor = 0xFF7F00;//color for admins in chat
var muteList = new Set();
var close = false;
room.onPlayerChat = function(player,msg){
    var pm = msg;
    var chat = msg;
    var message  = msg.split(/ +/);
    chatLog(player.name + ": " + msg);//sending chat logs to a discord channel
    if (["!help"].includes(message[0].toLowerCase())) {
        room.sendAnnouncement("🤖Command: !discord, !admin, !bye, !pm [playerid], !afk, !banlist",player.id,colors.white,'bold',2);
        room.sendAnnouncement("💠Rank Commands: !rank, !rankhelp, !rankreset",player.id,colors.orange,'bold',2);
        if(player.admin==true){
            room.sendAnnouncement("👇Admin Commands:",player.id,colors.white,'bold',2);
            room.sendAnnouncement("⚜️Moderation: !mute [playerid], !unmute [playerid], !clearbans, !unmuteall, !closechat, !openchat, !rr",player.id,colors.red,'bold',2);
            room.sendAnnouncement("🗺️Maps: !mapone, !maptwo, !mapthree, !rs, !minirs",player.id,colors.orange,'bold',2);
            room.sendAnnouncement("🔒Lock Room: !lock [password], !unlock",player.id,colors.yellow,'bold',2);
        }
        return false;
    }else if (["!bb", "!bye", "!cya", "!gn"].includes(message[0].toLowerCase())) {
        room.kickPlayer(player.id, "👋Bye !", false);
        return false;
    }else if (["!rankreset"].includes(message[0].toLowerCase())) {
        stats = JSON.parse(localStorage.getItem(auth)); 
        stats = [0,0,0,0,0,0,1,player.name,0]
        localStorage.setItem(auth, JSON.stringify(stats));
        room.sendAnnouncement("✅Your Rank Is Succesfully Reseted",player.id,colors.orange,'bold',2);
        return false;
    }else if (["!rank"].includes(message[0].toLowerCase())) {
        stats = JSON.parse(localStorage.getItem(auth)); 
        room.sendAnnouncement(player.name +": 💠Points: "+ stats[5].toString()+": 🤖Games: "+ stats[0].toString() + " 👌Wins: " + stats[1].toString() + " ❌Loses: " + stats[2].toString() + " ⚽️Goals: " + stats[3].toString()+ " 😂OG: " + stats[4].toString(),null,colors.white,'bold',2);
        return false;
    }else if (["!afk"].includes(message[0].toLowerCase())) {
        afkFun(player,msg);
        return false;
    }else if (["!dc","!discord"].includes(message[0].toLowerCase())) {
        room.sendAnnouncement("[PM]👥Discord: [discordlink]",player.id,colors.white,'bold',1);
        return false;
    } else if (["!rr"].includes(message[0].toLowerCase())&& player.admin) {
        room.stopGame();
        room.startGame();
        return false;
    }else if (["!admin"].includes(message[0].toLowerCase())) {
        callAdmin("[🕑"+new Date().getHours() + ":" + new Date().getMinutes()+"]"+player.name + " Calling For An Admin");;
        return false;
    } else if (["!mute"].includes(message[0].toLowerCase()) && player.admin == true) {
        var mutedPlayer = message[1]
        if(muteList.has(mutedPlayer)){
            //if admin trying to mute a player that the player is already muted
            room.sendChat("This Player İs Already Got Muted!",player.id);//private message to admin
        }else {
            //if admin trys to mute a player
            muteList.add(mutedPlayer);
        }
        return false;
    } else if (["!closechat"].includes(message[0].toLowerCase())&&player.admin) {
        room.sendAnnouncement("🚫Chat Closed By An Admin",null,colors.red,'bold',2);
        closed = true
        return false;
        
    } else if (["!openchat"].includes(message[0].toLowerCase())&&player.admin) {
        room.sendAnnouncement("✅Chat Opened By An Admin",null,colors.green,'bold',2);
        closed = false
        return false;
    } else if (["!lock"].includes(message[0].toLowerCase())&&player.admin) {
        room.setPassword(message[1]);
        room.sendAnnouncement("⚠️Room Locked By "+player.name,null,colors.orange,'bold',2);
        room.sendAnnouncement("[PM]Password: "+message[1],null,colors.red,'bold',2);
        return false;
    }else if (["!unlock"].includes(message[0].toLowerCase())&&player.admin) {
        room.setPassword();
        room.sendAnnouncement("⚠️Room Unlocked By "+player.name,null,colors.orange,'bold',2);
        return false;
    }else if (["!map1"].includes(message[0].toLowerCase())&&player.admin) {
        room.stopGame();
        if(mapone == "."){
            setDefaultStadium(classic)
        }else {
            room.setCustomStadium(mapone);
        }
        room.startGame();
        return false;
    } else if (["!map2"].includes(message[0].toLowerCase())&&player.admin) {
        room.stopGame();
        if(mapone == "."){
            setDefaultStadium(big)
        }else {
            room.setCustomStadium(maptwo);
        }
        room.startGame();
        return false;
    } else if (["!map3"].includes(message[0].toLowerCase())&&player.admin) {
        room.stopGame();
        if(mapone == "."){
            setDefaultStadium(huge)
        }else {
            room.setCustomStadium(mapthree);
        }
        room.startGame();
        return false;
    } else if (["!rs"].includes(message[0].toLowerCase())&&player.admin) {
        room.stopGame();
        room.setCustomStadium(mapRealSoccer);
        room.setScoreLimit(0);
        room.setTimeLimit(6);
        room.startGame();
        realMap = true
        return false;
    }else if (["!minirs"].includes(message[0].toLowerCase())&&player.admin) {
        room.stopGame();
        room.setCustomStadium(mapMiniRealSoccer);
        room.setScoreLimit(0);
        room.setTimeLimit(3);
        room.startGame();
        realMap2 = true
        return false;
    }else if (["!lineup"].includes(message[0].toLowerCase())&&player.admin) {
        redTeam = ["","","","","",""]
        blueTeam = ["","","","","",""]
        room.stopGame();
        room.setCustomStadium(mapLineUp);
        room.setScoreLimit(0);
        room.setTimeLimit(0);
        room.startGame();
        isLineUp = true
        return false;
    }else if (["!t"].includes(message[0].toLowerCase())) {
        let m = msg.substring(3);
        sendChatForTeam(player.name + ": " + m, player.team);
        return false;
    } else if (["!rankhelp"].includes(message[0].toLowerCase())) {
        room.sendAnnouncement("🟤[Bronze] 50-100 Points",player.id,colors.brown,'bold',2);
        room.sendAnnouncement("⚪️[Silver] 100-150 Points",player.id,colors.white,'bold',2);
        room.sendAnnouncement("🟣[Master] 150-200 Points",player.id,colors.purple,'bold',2);
        room.sendAnnouncement("🟡[Gold] 200 Points",player.id,colors.yellow,'bold',2);
        return false;
    } else if (["!unmuteall"].includes(message[0].toLowerCase())&&player.admin) {
        room.sendAnnouncement("⚠️Mutes Cleard",null,colors.orange,'bold',2);
        muteList.clear();
        return false;
    } else if (["!clearbans"].includes(message[0].toLowerCase())&&player.admin) {
        room.sendAnnouncement("⚠️Bans Cleard",null,colors.orange,'bold',2);
        room.clearBans();
        BanListForChat = [];
        return false;
    } else if (["!banlist", "!bans"].includes(message[0].toLowerCase())) {
        if (BanListForChat.length == 0) {
            room.sendAnnouncement("[PV] There's Nobody In The Ban List !", player.id,colors.white,'bold',1);
            return false;
        }
        var cstm = "[PM] Ban List : ";
        for (var i = 0; i < BanListForChat.length; i++) {
            if (140 - cstm.length < (BanListForChat[i][0] + "[" + (BanListForChat[i][1]) + "], ").length) {
                room.sendChat(cstm, player.id);
                cstm = "... ";
            }
            cstm += BanListForChat[i][0] + "[" + (BanListForChat[i][1]) + "], ";
        }
        cstm = cstm.substring(0, cstm.length - 2);
        cstm += ".";
        room.sendAnnouncement(cstm, player.id,colors.white,'bold',1);
        return false;
    }else if (["!claim"].includes(message[0].toLowerCase())) {
        if(message[1] == adminPassword){
            room.setPlayerAdmin(player.id, true);
            room.sendChat("You Logged İn As An Admin",player.id);
            adminList.add(player.id);//ads player to adminlist
            adminPassword = 1000 + getRandomInt(9000);//changes admin password
            console.log("Admin Password : " + adminPassword);
        }else {
            room.sendAnnouncement("Wrong Password",player.id,colors.red,'bold',2);
        }
        return false;
    } else if (["!pm"].includes(message[0].toLowerCase())) {
        sendPm(player,pm);
        return false;
    }
    if (message[0][0] == "!") {
        room.sendAnnouncement("⚠️The Command You Entered Is Invalid",player.id,colors.red,'bold',2)
        return false;
    }
    /*if (Blocked(msg)){
        room.sendAnnouncement("🚫[PM] Using This Word Is Not Allowed ",player.id,color.blue,'bold',2);
        return false;
    }*/
    if (message.some(m => blockedWords.includes(m))) {
        room.sendAnnouncement("🚫[PM] Using This Word Is Not Allowed ",player.id,colors.blue,'bold',2);
        return false
    }
    if(closed == true&& player.admin == false&& vipList.has(player.id) == false){
        room.sendChat("[PM]⚠️Chat Closed By An Admin, Wait Till The Admin Open Chat",player.id)
        return false;
    }
    if (SlowMode.includes(player.id) == true) {
        room.sendAnnouncement("[💬] Slow Mode Is Active. You Can Only Send 1 Message Every 5 Seconds. ⏱", player.id, 0x00FF00, "bold", 2);

        return false;

    }
    if (player.admin == false && SlowMode.includes(player.id) == false) {
        SlowMode.push(player.id);


        setTimeout(function() {
            SlowMode.splice(SlowMode.indexOf(player.id), 1);
        }, slowModeTime*1000);

    }
    var rankTag = "";
    stats = JSON.parse(localStorage.getItem(auth));
    if(stats[5] < 50){
        rankTag = "🦴";
    }else if(stats[5] >= 50 && stats[5] < 100){
        rankTag = "🟤";
    }else if(stats[5] >= 100&& stats[5] < 150){
        rankTag = "⚪️";
    }else if(stats[5] >= 150&& stats[5] < 200){
        rankTag = "🟣";
    }else if(stats[5] >= 200){
        rankTag = "🟡";
    }
    
    if(muteList.has(player.id) && player.admin == false){
        room.sendChat("[PM]You Are Muted",player.id)//sends a private message to muted player
        return false;
    }
    if(adminList.has(player.id) == true){
        room.sendAnnouncement("["+rankTag+"🔱Admin]"+player.name+": "+ chat,null,adminColor,'bold',2);
        return false;
    }else if(vipList.has(player.id)== true){
        room.sendAnnouncement("["+rankTag+"💎VIP]"+player.name+": "+ chat,null,vipColor,'bold',2);
        return false;
    }else if(adminList.has(player.id) == false && vipList.has(player.id)== false) {
        room.sendAnnouncement("["+rankTag+"#"+player.id+"]"+player.name+": "+ chat,null,0xffffff,'bold',2);//0xffffff is white
        return false;
    }
}

room.onPlayerBallKick = function(player){
    lastPlayerTouched = player;
    lastTeamTouched = player.team
}
room.onStadiumChange = function(newStadiumName){
    if(newStadiumName == "Real Soccer V6"){
        realMap = true
    }else {
        realMap = false
    }
    if(newStadiumName == "Mɪɴɪ Rs v3 v4"){
        realMap2 = true;
    }else {
        realMap2 = false
    }
    if(newStadiumName == "V6 Dizilim"){
        isLineUp = true;
    }else {
        isLineUp = false;
    }
}

room.onTeamGoal = function(team){
    const scores = room.getScores();
    BallPosition(0,0,0,0)
    var ownGoal = isOwnGoal(team,lastPlayerTouched);
    var own = false;
    if(ownGoal != ""){
        own = true;
    }else {
        own = false;
    }
    var redGoal = room.getScores().red
    var blueGoal = room.getScores().blue
    if(own == true){
        room.sendAnnouncement("🔴"+redGoal + " - " + blueGoal + "🔵",null,colors.white,'bold',2)
        room.sendAnnouncement(getTime(scores) + " 😂Own Goal By: " + lastPlayerTouched.name+" 💨Goal Speed: "+ballSpeed.toPrecision(4).toString() +"km/h",null,colors.yellow,'bold',2);
        stats[4] += 1
        stats[5] -= 1;
        localStorage.setItem(auth, JSON.stringify(stats));
    }else {
        if(lastPlayerTouched.team == Team.RED){
            room.sendAnnouncement("🔴"+redGoal + " - " + blueGoal + "🔵",null,colors.white,'bold',2)
            room.sendAnnouncement(getTime(scores) + " 🔴⚽Goal => " + lastPlayerTouched.name+" 💨Goal Speed: "+ballSpeed.toPrecision(4).toString() +"km/h",null,colors.red,'bold',2);
            stats[3] += 1
            stats[5] += 1;
            localStorage.setItem(auth, JSON.stringify(stats));
            setInterval(setBallColor(colors.red), 1000);
            //clearInterval(myInterval); 
            setInterval(setBallColor(colors.white), 2000);
            //clearInterval(myInterval2);
            /*var golInterval1 = setInterval(function () {setBallColor(colors.red)}, 1000);
            var golInterval2 = setInterval(function () {setBallColor(colors.white)}, 2000);
    
            clearInterval(golInterval1);
            clearInterval(golInterval2);*/
        }else if(lastPlayerTouched.team == Team.BLUE){
            room.sendAnnouncement("🔴"+redGoal + " - " + blueGoal + "🔵",null,colors.white,'bold',2)
            room.sendAnnouncement(getTime(scores) + " 🔵⚽Goal => " + lastPlayerTouched.name+" 💨Goal Speed: "+ballSpeed.toPrecision(4).toString() +"km/h",null,colors.blue,'bold',2);
            stats[3] += 1
            stats[5] += 1;
            localStorage.setItem(auth, JSON.stringify(stats));
            setInterval(setBallColor(colors.blue), 1000);
            clearInterval(myInterval3); 
            setInterval(setBallColor(colors.white), 2000);
            clearInterval(myInterval4);
            
            /*var golInterval3 = setInterval(function () {setBallColor(colors.blue)}, 1000);
            var golInterval4 = setInterval(function () {setBallColor(colors.white)}, 2000);
    
            clearInterval(golInterval3);
            clearInterval(golInterval4);*/
        }
    }
    
}
room.onPositionsReset = function(){
    /*if(lastTeamTouched == 1){
        var myInterval1 =  setInterval(room.sendChat("1"), 1000);
        clearInterval(myInterval1); 
        var myInterval2 = setInterval(setBallColor(colors.white), 2000);
        clearInterval(myInterval);
    }else if(lastTeamTouched == 2){
        var myInterval3 =  setInterval(setBallColor(colors.blue), 1000);
        clearInterval(myInterval3); 
        var myInterval4 = setInterval(setBallColor(colors.white), 2000);
        clearInterval(myInterval4);
    }*/
}
 
room.onTeamVictory = function(scores) {
    stats[0] += 1;
    localStorage.setItem(auth, JSON.stringify(stats));
    var reds = room.getPlayerList().filter(p => p.team == 1);
    var blues = room.getPlayerList().filter(p => p.team == 2);
    if(scores.red > scores.blue){
        reds.forEach(r => gameWinned())
        blues.forEach(b => gameLosed())
    }else {
        blues.forEach(b => gameWinned())
        reds.forEach(r => gameLosed())
    }
    var redGoal = room.getScores().red
    var blueGoal = room.getScores().blue
    var scores = room.getScores();
    if (redGoal > blueGoal) {
        if(blueGoal == 0){
            if(redTeam[0] != ""){
                room.sendAnnouncement("🏆 " + redTeam[0] + " Kept A CS!",null,colors.yellow,'bold',2);
            }
        }
        room.sendAnnouncement("🔴Red Team Won🔴",null,colors.red,'bold',2)
        redStreak = redStreak + 1
        blueStreak = 0
        room.sendAnnouncement("🔴Read Team's Win Streak:  " + redStreak,null,colors.white,'bold',2)
    } else if (blueGoal > redGoal) {
        if(redGoal == 0){
            if(blueTeam[0] != ""){
                room.sendAnnouncement("🏆 " + blueTeam[0] + " Kept A CS!",null,colors.yellow,'bold',2);
            }   
        }
        room.sendAnnouncement("🔵Blue Team Won🔵",null,colors.blue,'bold',2)
        blueStreak = blueStreak + 1
        redStreak = 0
        room.sendAnnouncement("🔵Blue Team's Win Streak " + blueStreak,null,colors.white,'bold',2)
    }
    RecSistem.sendDiscordWebhook(scores);
    kickOff = false;
}

room.onGameStart = function(){
    if(realMap == true){
        if(redTeam[0] != "" && blueTeam[0] != ""){
        room.sendAnnouncement("🥅🔴 " + redTeam[0] + " - " + blueTeam[0] + "🔵🥅")
        }
    }
    lastScores = room.getScores().red + room.getScores().blue;
    setBallColor(colors.white)
    if(sendRecWebhookURL != ""){
        room.startRecording();
        room.sendAnnouncement("📢You can watch the match records in our discord",null,colors.red,'bold',2);
    }
    //red normal: /colors red 60 FFFFFF FF0800 FF0800 FF0800
    //blue normal: /colors blue 60 FFFFFF 3C00FF 3C00FF 3C00FF
    if (redStreak < 3) {
        room.setTeamColors(1, 60, 0xFFFFFF, [0xFF0800, 0xFF0800, 0xFF0800]);
    }else if (redStreak == 3) {
        room.setTeamColors(1, 180, 0xffda26, [0xBC223B, 0x1D397A, 0xBC223B]);
    } else if (redStreak == 6) {
        room.setTeamColors(1, 180, 0xF7F7F7, [0xA80617, 0xB60D1F, 0xA80617]);
    }
    if (blueStreak < 3) {
        room.setTeamColors(2, 180, 0xFFFFFF, [0x0082E1, 0x0C161E, 0x0082E1]);
    } else if (blueStreak == 3) {
        room.setTeamColors(2, 60, 0xFFFFFF, [0x3C00FF, 0x3C00FF, 0x3C00FF]);
    } else if (blueStreak == 6) {
        room.setTeamColors(2, 299, 0xe0e0e0, [0x0C8FEA]);
    }
    
    kickOff = true
}
room.onGameStop = function(){
    if(realMap == true){
        redTeam = ["","","","","",""];
        blueTeam = ["","","","","",""];
    }
    kickOff = false;
}
room.onGameTick = function(){
    checkBall();
    checkBallPosition();
    checkBallPosition2();
}

room.onGamePause = function(){
    kickOff = false;
}

room.onGameUnpause = function(){
    kickOff = true;
}

room.onPlayerLeave = function(player){
    GetPlayer(player.id).inroom = false;
    //updateAdmins();
}

room.onPlayerKicked = function(kickedPlayer,reason,ban,byPlayer){
    if(ban == true){
        SendBanAnnouncement(byPlayer,kickedPlayer,reason)
    }
    if(ban == true){
        /*var banned = GetPlayer(kickedPlayer.id).auth;
        banList.push(banned);
        localStorage.setItem("banlist", JSON.stringify(banList));*/
        stats = JSON.parse(localStorage.getItem(auth));
        stats[8] = 1;
        localStorage.setItem(auth, JSON.stringify(stats));

    }
    ban == true ? BanListForChat.push([kickedPlayer.name, kickedPlayer.id]) : null;
    ban == true ? console.log(kickedPlayer.name + " Banned By " + byPlayer.name + " - Reason: "+ reason) : console.log(kickedPlayer.name + " Kicked By " + byPlayer.name + " - Reason: "+ reason)
}
room.onPlayerActivity = function(player) {
	if(player.team != 0)
	playersAfk[player.name] = 0;
}

room.onPlayerTeamChange = function(player){
    if(player.id == 0){
        room.setPlayerTeam(player.id,0);
        room.sendAnnouncement("⚠️You Can't Get The Bot Into The Game",null,colors.yellow,'normal',2);
    }
    if(afkPlayerIDs.has(player.id)){
        room.setPlayerTeam(player.id,0);
        room.sendAnnouncement("⚠️"+player.name+ " Is 𝐀𝐅𝐊",null,colors.yellow,'normal',2);
    }
    
}




document.title = roomName;




/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');
const Textures = require('Textures');
const Materials = require('Materials');
const TouchGestures = require('TouchGestures');
const Patches = require('Patches');
const Reactive = require('Reactive');
const Audio = require('Audio');
// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');

//Materials
const roomMat = Materials.get('room');

//Textures
const spaceTex = Textures.get('space')
const prismTex = Textures.get('prism');
const electricTex=Textures.get('spark')
const instructText = Scene.root.find('instructText');

//Objects
const subject = Scene.root.find('chooseSub');
const gravity = Scene.root.find('gravity');
const roomObject = Scene.root.find('room');
const krupoorva = Scene.root.find('krupoorva');
const startTrigger = Scene.root.find('start');
//AudioControllers
const audios = [
Audio.getPlaybackController('intro'),
Audio.getPlaybackController('gravity'),
 Audio.getPlaybackController('spark'),
Audio.getPlaybackController('optics'),
Audio.getPlaybackController('vandeff'),
Audio.getPlaybackController('orbit'),
Audio.getPlaybackController('prism')];



//RoomObjects
var roomObjects = [
    Scene.root.find('orbit'),
    Scene.root.find('prism'),
    Scene.root.find('van deff')
];

//ARObjects
var arObjects = [
    Scene.root.find('orbitAR'),
    Scene.root.find('prismAR'),
    Scene.root.find('vandeffAR')
];

//FaceMasks
var faceMasks = [
    Scene.root.find('sparkit'),
    Scene.root.find('rainbow'),
    Scene.root.find('apple')
]

var isFirstTime = true;
var experienceSelected = 0;
var arMode = false;
TouchGestures.onTap(krupoorva).subscribe(function(gesture){
if(isFirstTime){
    Audio.getPlaybackController('intro').play();
}
});

TouchGestures.onTap(gravity).subscribe(function(gesture){
    hideAll();
    arMode = false;
    experienceSelected =1;
    Scene.root.find('startInstruct').text = "Start Experience"
    roomMat.diffuse = spaceTex;
    roomObject.hidden=false;
    Patches.inputs.setPulse('reverse',Reactive.once());
    instructText.text = "Gravity is a natural phenomenon by which all things with mass or energy—including planets, stars, galaxies, and even light are brought toward (or gravitate toward) one another"
    Patches.inputs.setPulse('instruction',Reactive.once());
    subject.hidden = true;
    isFirstTime = false;
    
   audioPlay(1);
   

});
const rayoptics = Scene.root.find('rayoptics');
TouchGestures.onTap(rayoptics).subscribe(function(gesture){
    arMode = false;
   hideAll();

    experienceSelected=2;
    Scene.root.find('startInstruct').text = "Start Experience"
    roomMat.diffuse = prismTex;
    roomObject.hidden=false;
    Patches.inputs.setPulse('reverse',Reactive.once());
    instructText.text = "Optics is the branch of physics that studies the behaviour and properties of light, including its interactions with matter and the construction of instruments that use or detect it. Optics usually describes the behaviour of visible, ultraviolet, and infrared light."
    Patches.inputs.setPulse('instruction',Reactive.once());
    subject.hidden = true;
    isFirstTime = false;
    audioPlay(3);

});
const electromagnetism = Scene.root.find('electromagnetism');
TouchGestures.onTap(electromagnetism).subscribe(function(gesture){
    hideAll();
    arMode = false;
    experienceSelected=3;
    Scene.root.find('startInstruct').text = "Start Experience"
    roomMat.diffuse = electricTex;
    roomObject.hidden=false;
    Patches.inputs.setPulse('reverse',Reactive.once());
    instructText.text = "Electromagnetism is a branch of physics involving the study of the electromagnetic force, a type of physical interaction that occurs between electrically charged particles. The electromagnetic force is carried by electromagnetic fields composed of electric fields and magnetic fields, and it is responsible for electromagnetic radiation such as light"
    Patches.inputs.setPulse('instruction',Reactive.once());
    subject.hidden = true;
    isFirstTime = false;
    audioPlay(2);
    
});

TouchGestures.onTap(startTrigger).subscribe(function(gest){
    Scene.root.find('startInstruct').text = "Try in Your Space";
    roomObject.hidden=false;
    hideAll();
if(experienceSelected==3){
    showFaceMask(0);
    showRoomSpace(2);
    instructText.text = "To your right, is A Van de Graaff generator. \nTap on it to Interact \nSwitch camera for a bonus!"
    Patches.inputs.setPulse('instruction',Reactive.once());
    audioPlay(4);
    
    if(arMode){
        roomObject.hidden = true;
        showUserSpace(2);
        Scene.root.find('startInstruct').text = "Try in Virtual Space";
    }}
if(experienceSelected==2){
    showRoomSpace(1);
    showFaceMask(1);
    instructText.text = "To your left, is a Prism. \n Tap on it to Interact \nSwitch camera for a bonus!"
    Patches.inputs.setPulse('instruction',Reactive.once());
    audioPlay(6);
    
    if(arMode){
        roomObject.hidden = true;
        showUserSpace(1);
        Scene.root.find('startInstruct').text = "Try in Virtual Space";
    }}
if(experienceSelected==1){
    showRoomSpace(0);
    showFaceMask(2);
    instructText.text = "To your right, is Earth's Orbit around Sun. \n Tap on it to Interact \nSwitch camera for a bonus!"
    Patches.inputs.setPulse('instruction',Reactive.once());
    audioPlay(5);
    
    if(arMode){
        roomObject.hidden = true;
        showUserSpace(0);
        Scene.root.find('startInstruct').text = "Try in Virtual Space";
    }}
    


  arMode=!arMode;
    
});

function audioPlay(audio){
for(var i=0;i<audios.length;i++){
    audios[i].reset();
}

audios[audio].play();
}

function hideAll(){
    for(var i=0;i<roomObjects.length;i++){
    roomObjects[i].hidden=true;
    arObjects[i].hidden=true;
    }
    
}
function showUserSpace(index){
    hideAll();
    arObjects[index].hidden=false;
}
function showRoomSpace(index){
    hideAll();
    roomObjects[index].hidden=false;

}

function showFaceMask(index){
for (var i=0;i<faceMasks.length;i++){
    faceMasks[i].hidden=true;
}
faceMasks[index].hidden=false;
}
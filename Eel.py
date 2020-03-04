import eel
import sqlite3
import ctypes
import time
import speech_recognition as sr
from gtts import gTTS
import requests
import playsound
import os
from io import BytesIO
from io import StringIO
import sys
import pyodbc
import pdb
import asyncio


#Directory change for eel issue
os.chdir(r'C:\Users\Royston\Documents\Automation Anywhere Files\Automation Anywhere\My Docs\LisaAI\Assets\Eel')


num = 1
def assistant_speaks(output):
    global num
    num +=1
    toSpeak = gTTS(text=output, lang='en-US', slow=False)
    file = str(num)+".mp3"
    toSpeak.save(file)
    playsound.playsound(file, True)
    if os.path.isfile(file):
      os.remove(file)

@eel.expose
def start_record():
    ctypes.windll.user32.MessageBoxW(0, "ok", "Message", 1)
    async_eel.spawn(get_audio())

@eel.expose
def get_audio():
    ctypes.windll.user32.MessageBoxW(0, vName, "Test", 1)
    r = sr.Recognizer()
    audio = ''
    playsound.playsound(r'C:\Users\Royston\Documents\Automation Anywhere Files\Automation Anywhere\My Docs\LisaAI\Assets\Voice\start.mp3', True)
    ctypes.windll.user32.MessageBoxW(0, "In", "Message", 1)
    with sr.Microphone() as source:
        playsound.playsound(r'C:\Users\Royston\Documents\Automation Anywhere Files\Automation Anywhere\My Docs\LisaAI\Assets\Voice\start.mp3', True)
        audio = r.listen(source, phrase_time_limit=5)
        playsound.playsound(r'C:\Users\Royston\Documents\Automation Anywhere Files\Automation Anywhere\My Docs\LisaAI\Assets\Voice\end.mp3', True)
    try:
        text = r.recognize_google(audio,language='en-US')
        return text
    except:
        assistant_speaks("Could not understand your audio, Please try again!")
        return 0
    vLisaTexto = get_audio()
    async_eel.LisaTextract(vLisaTexto)
    

def end_session():
    c.execute("UPDATE args SET vCurrentSession = '0'")




if __name__ == '__main__':
    eel.init('web')
    eel.start('main.html', size=(900, 700),host='localhost',port=0, disable_cache=True,block=False)
    while True:
        eel.sleep(1.0)


    



# Armanly

A small web app for our English speaking class. It turns the vocabulary, phrases and grammar from the class slides into short daily lessons, flashcards and practice.

**Open the app:** https://armannss.github.io/speak-and-learn/

It runs in any modern browser on a phone or a computer. There is nothing to install and no account to create.

## What you can do in it

- **Learn.** 151 expressions in 13 topics, split into 29 short lessons. Each lesson teaches about five expressions (pronunciation, Persian meaning, example sentence) and then checks them with a few questions.
- **Cards.** Swipe flashcards with spaced repetition: words you know come back less often, words you miss come back sooner.
- **Practice.** A mixed Daily 10, fill the blank, collocations, listen and type, grammar drills, and timed speaking drills.
- **Library.** The full word list, 11 groups of conversation phrases, and 7 grammar topics with rules, examples and common mistakes.
- **My words.** Add your own words and phrases. They join your flashcards and practice.
- **Progress.** XP, levels, a daily streak, badges, and a list of the expressions you got wrong so you can review them.

About 10 to 15 minutes a day is enough: one lesson, ten flashcards, one speaking drill.

## Add it to your home screen

- **iPhone (Safari):** Share, then "Add to Home Screen".
- **Android (Chrome):** menu, then "Add to Home screen" or "Install app".

After the first visit it also works offline.

## Your data

Everything you do (progress, streak, your own words) is saved in your browser on your device. Nothing is sent to a server, and nobody else can see it.

This also means your progress does not follow you to another device. To move it, open the progress panel (tap the level or streak at the top), choose **Save backup file**, and use **Restore from file** on the other device. Save a backup before clearing your browser data.

Pronunciation uses the voice built into your device, so how it sounds depends on your phone or computer.

## For whoever maintains this

The app is plain HTML, CSS and JavaScript with no build step and no dependencies.

| File | What it is |
| --- | --- |
| `index.html` | The whole app: content, styles and code |
| `sw.js` | Service worker that makes the app work offline |
| `manifest.json` | Name, colours and icons for the home-screen install |
| `icon-180.png`, `icon-192.png`, `icon-512.png` | App icons |

It is hosted with GitHub Pages from the root of the `main` branch.

To update the content after a class, replace `index.html` and `sw.js` with the new versions. The cache name at the top of `sw.js` has to change with every update, otherwise phones keep showing the old version.

## Credits

Content comes from the materials of our English speaking class. Built by Arman Naseri Far.

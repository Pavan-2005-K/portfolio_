/* ============================================================
   EDIT THIS FILE to change skills, projects and certificates.
   Save, then refresh the page (or git push to redeploy).
   ============================================================ */

/* ---------- SKILLS: [category title, [skill names]] ---------- */
var SK=[
  ["Languages",["C","C++","Java","JavaScript","Python"]],
  ["Frontend",["HTML","CSS","React JS"]],
  ["Backend",["Node JS","Express JS","FastAPI","REST APIs","JWT","Socket.IO","Mongoose"]],
  ["Database",["MongoDB","PostgreSQL","Supabase","Redis"]],
  ["AI & Integration",["Groq AI"]],
  ["Developer Tools",["Git","GitHub","VS Code","Postman","Docker","Vercel","Render","AWS EC2"]]];

/* Brand colour shown when you hover a skill card. Add a name here if you add a new skill. */
var CL={'C':'#5568c9','C++':'#00599c','Java':'#e76f00','JavaScript':'#c9a800','Python':'#3776ab','HTML':'#e34f26','CSS':'#1572b6','React JS':'#0891b2','Node JS':'#3c873a','Express JS':'#6b7280','FastAPI':'#059669','REST APIs':'#e8590c','JWT':'#a21caf','Socket.IO':'#4b5563','Mongoose':'#b91c1c','MongoDB':'#47a248','PostgreSQL':'#336791','Supabase':'#1fa971','Redis':'#dc382d','Groq AI':'#f55036','Git':'#f05032','GitHub':'#8957e5','VS Code':'#007acc','Postman':'#ff6c37','Docker':'#2496ed','Vercel':'#52525b','Render':'#0f9d7a','AWS EC2':'#d97706'};

/* ---------- PROJECTS ----------
   title, description, tags (list)
   image : one file ("assets/x.jpg") OR a list of files (they fade through automatically)
   github: the whole card becomes a link to this URL (leave "" for a plain card)
   fit   : optional, "contain" shows the whole image instead of cropping it
   pos   : optional, crop position like "top" or "center"                       */
var PROJECTS=[
  {title:"Email Threat Detection Platform",
   description:"Web platform that analyzes email content and flags suspicious characteristics and potential phishing threats. React frontend for submitting emails and showing results, FastAPI backend for analysis.",
   tags:["React JS","FastAPI","Python"],image:"assets/project-email.jpg",github:"https://github.com/Pavan-2005-K/Email"},
  {title:"Movie Ticket Booking System",
   description:"Full stack booking system with movie, seat and booking management. Redis locks seats temporarily to prevent double booking, Socket.IO syncs seats live, and Groq AI recommends movies.",
   tags:["React JS","Node JS","Express JS","Supabase","Redis","Socket.IO","Groq AI"],image:"assets/project-movie.jpg",github:"https://github.com/Pavan-2005-K/Movie-Booking"},
  {title:"QR Attendance System",
   description:"Attendance system with separate Teacher and Student roles. QR codes expire after 60 seconds, and students scan the active code to mark attendance.",
   tags:["React JS","Node JS","Express JS","MongoDB","JWT"],image:"assets/project-qr.jpg",github:"https://github.com/Pavan-2005-K/QRAttendence"},
  {title:"Bluetooth Laser Security System",
   description:"Arduino-based security system for night-shift surveillance. A laser aimed at an LDR module triggers a buzzer and LED when the beam breaks, a Bluetooth module sends instant alerts to a phone app, and an I2C LCD shows live status. Powered by a 9V battery with a buck converter stepping down to 5V.",
   tags:["Arduino","LDR Module","HC-05 Bluetooth","I2C LCD","Buzzer","Buck Converter"],
   image:["assets/project-laser-1.jpg","assets/project-laser-2.jpg","assets/project-laser-3.jpg"],pos:"center",github:""},
  {title:"Mini WhatsApp API",
   description:"REST APIs for WhatsApp-style messaging, with backend routes and endpoints for managing users and messages.",
   tags:["Node JS","Express JS","REST APIs"],image:"assets/project-whatsapp.jpg",github:"https://github.com/Pavan-2005-K/day5/tree/main/Mini-WhatsApp-Api"},
  {title:"Tic Tac Toe",
   description:"Tic Tac Toe game where you play against the computer, with a live scoreboard and reset and back controls.",
   tags:["HTML","CSS","JavaScript"],image:"assets/project-tictactoe.jpg",fit:"contain",github:"https://github.com/Pavan-2005-K/tic-tac-toe"}
];

/* ---------- CERTIFICATES ----------
   title, issuer, date, image (file inside assets/),
   link (optional: a verify URL; if empty, the image opens in a popup)  */
var CERTS=[
  {title:"Backend Development with Node.js",issuer:"Technical Career Education",date:"May 2026 \u2022 Grade O",image:"assets/cert-nodejs-backend.jpg",link:""},
  {title:"Associate in IT Foundation Skills (Python)",issuer:"Infosys Springboard",date:"Apr 2026",image:"assets/cert-infosys-python.jpg",link:""},
  {title:"MERN Stack Training",issuer:"Technical Career Education",date:"Nov 2025 \u2022 Grade O",image:"assets/cert-mern-stack.jpg",link:""},
  {title:"AINNOVATION 2025: Microsoft AI Learning Challenge",issuer:"Microsoft",date:"Sep 2025",image:"assets/cert-microsoft-ai-learning.jpg",link:""},
  {title:"AINNOVATION 2025: Applied AI Learning Challenge",issuer:"Microsoft",date:"Sep 2025",image:"assets/cert-microsoft-applied-ai.jpg",link:""},
  {title:"Rapid Prototyping",issuer:"Technical Career Education",date:"Jan 2025 \u2022 Grade Good",image:"assets/cert-rapid-prototyping.jpg",link:""}
];

/* ---------- CONTACT FORM (backend API) ----------
   The form posts to the Express backend, which stores messages in MongoDB.
   API_BASE_URL_PROD : optional API origin override. Leave empty when the site
                       and API are deployed together on Vercel.
   API_BASE_URL_LOCAL: used automatically when the site is opened on localhost. */
var API_BASE_URL_PROD="";
var API_BASE_URL_LOCAL="http://localhost:5000";

/* ---------- ABOUT ANIMATION (optional GIF) ----------
   Save an animated GIF as assets/about.gif and set this to "assets/about.gif".
   While empty, the page uses the built-in animated illustration. */
var ABOUT_GIF="";

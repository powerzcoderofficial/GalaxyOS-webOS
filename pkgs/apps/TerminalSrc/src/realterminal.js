/*This is basically the root of the entire js code. you should not make changes here.*/
document.addEventListener('DOMContentLoaded', () => {
    /*here we define some values to constants for muchhhhh better eperience. you can edit their name
    e*/
    const path = {};
    path.join = (...args) => args.join('/');
    const commandInput = document.getElementById('command-input');
    const outputDiv = document.getElementById('output');
    /*here i have made a super basic file system with some starting files. you can edit these files! */
    let fileSystem = {
      '/': {
          type: 'directory',
          contents: {
              'home': {
                  type: 'directory',
                  contents: {},
              },
              'user.txt': {
                  type: 'file',
                  data: '',
              },
          },
      },
  };
      /*these are functions for the advanced file system. these functions use the localStorage() API to save the files locally.*/
      function saveFileSystem() {
        localStorage.setItem('fileSystem', JSON.stringify(fileSystem));
      }
      
      function loadFileSystem() {
        const storedFileSystem = localStorage.getItem('fileSystem');
        if (storedFileSystem) {
          fileSystem = JSON.parse(storedFileSystem);
        }
      }
      
      loadFileSystem();

    let cwd = '/';

    const jokes = [
    {
      setup: "Why don't scientists trust atoms?",
      punchline: "Because they make up everything!"
    },
    {
      setup: "Why don't eggs tell jokes?",
      punchline: "They'd crack each other up!"
    },
    {
      setup: "Why did the tomato turn red?",
      punchline: "Because it saw the salad dressing!"
    },
      {
        setup: "Why did the scarecrow win an award?",
        punchline: "Because he was outstanding in his field!"
      },
      {
        setup: "What do you call fake spaghetti?",
        punchline: "An impasta!"
      },
      {
        setup: "Why don’t scientists trust atoms?",
        punchline: "Because they make up everything!"
      },
      {
        setup: "How does a penguin build its house?",
        punchline: "Igloos it together!"
      },
      {
        setup: "What do you get if you cross a snowman and a dog?",
        punchline: "Frostbite!"
      },
      {
        setup: "Why did the math book look sad?",
        punchline: "Because it had too many problems."
      },
      {
        setup: "What do you call cheese that isn’t yours?",
        punchline: "Nacho cheese!"
      },
      {
        setup: "Why don’t some couples go to the gym?",
        punchline: "Because some relationships don’t work out."
      },
      {
        setup: "How do you organize a space party?",
        punchline: "You planet!"
      },
      {
        setup: "Why did the bicycle fall over?",
        punchline: "It was two-tired!"
      },
      {
        setup: "What do you call a bear with no teeth?",
        punchline: "A gummy bear!"
      },
      {
        setup: "How does a scientist freshen her breath?",
        punchline: "With experi-mints!"
      },
      {
        setup: "What do you call a pile of cats?",
        punchline: "A meowtain!"
      },
      {
        setup: "Why did the golfer bring two pairs of pants?",
        punchline: "In case he got a hole in one!"
      },
      {
        setup: "What’s orange and sounds like a parrot?",
        punchline: "A carrot!"
      },
      {
        setup: "Why was the math teacher always worried?",
        punchline: "Because she had too many problems."
      },
      {
        setup: "What do you call an alligator in a vest?",
        punchline: "An investigator!"
      },
      {
        setup: "How do cows stay up to date with current events?",
        punchline: "They read the moos-paper!"
      },
      {
        setup: "Why did the computer go to the doctor?",
        punchline: "Because it had a virus!"
      },
      {
        setup: "What did one ocean say to the other ocean?",
        punchline: "Nothing, they just waved."
      },
      {
        setup: "How do you catch a squirrel?",
        punchline: "Climb a tree and act like a nut!"
      },
      {
        setup: "Why did the scarecrow become a successful neurosurgeon?",
        punchline: "Because he was outstanding in his field."
      },
      {
        setup: "What did the grape do when it got stepped on?",
        punchline: "Nothing but let out a little wine!"
      },
      {
        setup: "Why don’t skeletons fight each other?",
        punchline: "They don’t have the guts."
      },
      {
        setup: "What do you call a fish with no eyes?",
        punchline: "Fsh!"
      },
      {
        setup: "Why was the math book unhappy?",
        punchline: "It had too many problems."
      },
      {
        setup: "What did one wall say to the other wall?",
        punchline: "I’ll meet you at the corner."
      },
      {
        setup: "Why did the tomato turn red?",
        punchline: "Because it saw the salad dressing!"
      },
      {
        setup: "What did one snowman say to the other snowman?",
        punchline: "Do you smell carrots?"
      },
      {
        setup: "How do you make a tissue dance?",
        punchline: "Put a little boogie in it!"
      },
      {
        setup: "What do you call a dinosaur with an extensive vocabulary?",
        punchline: "A thesaurus!"
      },
      {
        setup: "Why don’t some couples go to the gym?",
        punchline: "Because some relationships don’t work out."
      },
      {
        setup: "What do you call a lazy kangaroo?",
        punchline: "A pouch potato!"
      },
      {
        setup: "Why did the coffee file a police report?",
        punchline: "It got mugged!"
      },
      {
        setup: "What’s brown and sticky?",
        punchline: "A stick!"
      },
      {
        setup: "Why did the scarecrow become a successful neurosurgeon?",
        punchline: "Because he was outstanding in his field."
      },
      {
        setup: "What do you call a cow with no legs?",
        punchline: "Ground beef!"
      },
      {
        setup: "Why did the golfer bring an extra pair of pants?",
        punchline: "In case he got a hole in one."
      },
      {
        setup: "How does a penguin build its house?",
        punchline: "Igloos it together!"
      },
      {
        setup: "What did one hat say to the other hat?",
        punchline: "Stay here, I’m going on ahead!"
      },
      {
        setup: "Why did the chicken join a band?",
        punchline: "Because it had the drumsticks!"
      },
      {
        setup: "What do you get when you cross a snowman with a vampire?",
        punchline: "Frostbite!"
      },
      {
        setup: "Why did the bicycle fall over?",
        punchline: "It was two-tired."
      },
      {
        setup: "What do you call a bear that’s stuck in the rain?",
        punchline: "A drizzly bear!"
      },
      {
        setup: "Why did the golfer bring two pairs of pants?",
        punchline: "In case he got a hole in one."
      },
      {
        setup: "What did one ocean say to the other ocean?",
        punchline: "Nothing, they just waved."
      },
      {
        setup: "How do you make holy water?",
        punchline: "You boil the hell out of it."
      },
      {
        setup: "Why did the math book look sad?",
        punchline: "Because it had too many problems."
      },
      {
        setup: "What do you call a fake noodle?",
        punchline: "An impasta!"
      },
      {
        setup: "What do you call an alligator in a vest?",
        punchline: "An investigator!"
      },
    ];
  
    
    const quotes = [
      {
        quote: "Every once in awhile we may fall on our face, but we insist on doing what we wanna do.",
        author: "Cliff Burton"
      },
      {
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
      },
      {
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
      },
      {
        quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill"
      },
      {
        quote: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde"
      },
      {
        quote: "In three words I can sum up everything I've learned about life: it goes on.",
        author: "Robert Frost"
      },
      {
        quote: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        author: "Ralph Waldo Emerson"
      },
      {
        quote: "You miss 100% of the shots you don’t take.",
        author: "Wayne Gretzky"
      },
      {
        quote: "The best way to predict the future is to invent it.",
        author: "Alan Kay"
      },
      {
        quote: "Life is what happens when you’re busy making other plans.",
        author: "John Lennon"
      },
      {
        quote: "To live is the rarest thing in the world. Most people exist, that is all.",
        author: "Oscar Wilde"
      },
      {
        quote: "The purpose of our lives is to be happy.",
        author: "Dalai Lama"
      },
      {
        quote: "You only live once, but if you do it right, once is enough.",
        author: "Mae West"
      },
      {
        quote: "Happiness is not something ready-made. It comes from your own actions.",
        author: "Dalai Lama"
      },
      {
        quote: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt"
      },
      {
        quote: "Do not take life too seriously. You will never get out of it alive.",
        author: "Elbert Hubbard"
      },
      {
        quote: "Life isn’t about finding yourself. Life is about creating yourself.",
        author: "George Bernard Shaw"
      },
      {
        quote: "Be the change that you wish to see in the world.",
        author: "Mahatma Gandhi"
      },
      {
        quote: "Everything you’ve ever wanted is on the other side of fear.",
        author: "George Addair"
      },
      {
        quote: "The best revenge is massive success.",
        author: "Frank Sinatra"
      },
      {
        quote: "What we think, we become.",
        author: "Buddha"
      },
      {
        quote: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
        author: "Martin Luther King Jr."
      },
      {
        quote: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu"
      },
      {
        quote: "You do not find the happy life. You make it.",
        author: "Camilla E. Kimball"
      },
      {
        quote: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins"
      },
      {
        quote: "Don’t count the days, make the days count.",
        author: "Muhammad Ali"
      },
      {
        quote: "We do not remember days; we remember moments.",
        author: "Cesare Pavese"
      },
      {
        quote: "The only thing we have to fear is fear itself.",
        author: "Franklin D. Roosevelt"
      },
      {
        quote: "Life is either a daring adventure or nothing at all.",
        author: "Helen Keller"
      },
      {
        quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela"
      },
      {
        quote: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
      },
      {
        quote: "It does not do to dwell on dreams and forget to live.",
        author: "J.K. Rowling"
      },
      {
        quote: "You can’t go back and change the beginning, but you can start where you are and change the ending.",
        author: "C.S. Lewis"
      },
      {
        quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
        author: "Ralph Waldo Emerson"
      },
      {
        quote: "We may encounter many defeats but we must not be defeated.",
        author: "Maya Angelou"
      },
      {
        quote: "To succeed in life, you need two things: ignorance and confidence.",
        author: "Mark Twain"
      },
      {
        quote: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson"
      },
      {
        quote: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius"
      },
      {
        quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        author: "Aristotle"
      },
      {
        quote: "The mind is everything. What you think you become.",
        author: "Buddha"
      },
      {
        quote: "The unexamined life is not worth living.",
        author: "Socrates"
      },
      {
        quote: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
      },
      {
        quote: "To live a creative life, we must lose our fear of being wrong.",
        author: "Joseph Chilton Pearce"
      },
      {
        quote: "If you tell the truth, you don't have to remember anything.",
        author: "Mark Twain"
      },
      {
        quote: "The only true wisdom is in knowing you know nothing.",
        author: "Socrates"
      },
      {
        quote: "Act as if what you do makes a difference. It does.",
        author: "William James"
      },
      {
        quote: "The harder I work, the luckier I get.",
        author: "Samuel Goldwyn"
      },
      {
        quote: "The best way to find yourself is to lose yourself in the service of others.",
        author: "Mahatma Gandhi"
      },
    ];
        
    function loadJokesAndQuotes() {
      fetch('jokes.json')
        .then(response => response.json())
        .then(data => jokes.push(...data))
        .catch(error => console.error('Error loading jokes:', error));

      fetch('quotes.json')
        .then(response => response.json())
        .then(data => quotes.push(...data))
        .catch(error => console.error('Error loading quotes:', error));
    }
    
    loadJokesAndQuotes();
    /*These are all the commands. lets just say these are the main stuff of this js file.*/
    const commands = {
      help: () => {
        const helpText = `
          <h2>Available Commands:</h2>
          <ul>
            <li><b>about</b> - Shows information about the creator</li>
            <li><b>github</b> - Provides link to github page of the creator</li>
            <li><b>ver</b> - Displays the version of CloudOS</li>
            <li><b>echo</b> - Echoes the input arguments</li>
            <li><b>clear</b> - Clears the output screen</li>
            <li><b>date</b> - Displays the current date and time</li>
            <li><b>calc</b> - Evaluates a mathematical expression</li>
            <li><b>ls</b> - Lists the files and directories in the current directory (not working at the moment.)</li>
            <li><b>cd</b> - Changes the current directory</li>
            <li><b>mkdir</b> - Creates a new directory</li>
            <li><b>rm</b> - Removes a file or directory</li>
            <li><b>touch</b> - Creates a new file</li>
            <li><b>joke</b> - Tells a joke</li>
            <li><b>quote</b> - Displays a motivational quote</li>
            <li><b>roll</b> - Rolls a dice</li>
            <li><b>8ball</b> - Provides a random answer to a question</li>
            <li><b>console</b> - Lets you have remote access to the browser console - lets you execute commands</li>
            <li><b>editor</b> - Opens a text editor (not implemented)</li>
            <li><b>help</b> - Displays this help message</li>
          </ul>
          <p>Type 'help <command>' to get more information about a specific command.</p>
        `;
        return helpText.trim();
      },
        ver: () => 'Version 1.0',
        about: () => 'Powerz is an almost 15 year old person who tries to make useful products for people.',
        github: () => 'https://github.com/powerzcoderofficial',
        echo: (args) => args.join(' '),
        clear: () => {
            outputDiv.innerHTML = '';
            return '';
        },
        date: () => new Date().toLocaleString(),
        calc: (args) => eval(args.join(' ')),
        ls: () => {
          /*This is not working atm. please help out if can!*/
          const currentDir = cwd || '/';
          const dir = fileSystem[currentDir];
          if (!dir) {
            return `Directory not found: ${currentDir}`;
          }
          const filesAndDirs = Object.keys(dir.contents);
          return filesAndDirs.map((fileOrDir) => {
            const filePath = path.join(currentDir, fileOrDir);
            const fileOrDirInfo = fileSystem[filePath];
            return fileOrDirInfo.type === 'directory' ? `${fileOrDir}/` : fileOrDir;
          }).join('\n');
        },
        cd: (args) => {
          const dir = args[0];
          if (!dir) {
            return 'Usage: cd <directory>';
          }
          if (dir === '/') {
            cwd = '/';
            return `Changed directory to ${cwd}`;
          }
          if (dir === '..') {
            const parentDir = path.dirname(cwd);
            if (parentDir === cwd) {
              return `Already in root directory: ${cwd}`;
            }
            cwd = parentDir;
            return `Changed directory to ${cwd}`;
          }
          const homeDir = path.join(cwd, 'home');
          if (dir === 'home' && fileSystem[homeDir]) {
            cwd = homeDir;
            return `Changed directory to ${cwd}`;
          }
          const newDir = path.join(cwd, dir);
          if (!fileSystem[newDir]) {
            return `Directory not found: ${newDir}`;
          }
          cwd = newDir;
          return `Changed directory to ${cwd}`;
        },
        mkdir: (args) => {
            const dir = args[0];
            if (!dir) {
                return 'Usage: mkdir <directory>';
            }
            const newDir = path.join(cwd, dir);
            if (fileSystem[newDir]) {
                return `Directory already exists: ${newDir}`;
            }
            fileSystem[newDir] = {
                type: 'directory',
                contents: {},
              };
              saveFileSystem();
              return `Created directory ${newDir}`;
        },
        rm: (args) => {
            const fileOrDir = args[0];
            if (!fileOrDir) {
                return 'Usage: rm <file or directory>';
            }
            const filePath = path.join(cwd, fileOrDir);
            if (!fileSystem[filePath]) {
                return `File or directory not found: ${filePath}`;
            }
            delete fileSystem[filePath];
            saveFileSystem();
            return `Removed ${filePath}`;
        },
        touch: (args) => {
            const file = args[0];
            if (!file) {
                return 'Usage: touch <file>';
            }
            const filePath = path.join(cwd, file);
            if (fileSystem[filePath]) {
                return `File already exists: ${filePath}`;
            }
            fileSystem[filePath] = {
                type: 'file',
                data: '',
              };
              saveFileSystem();
              return `Created file ${filePath}`;
        },
        joke: () => {
          const randomIndex = Math.floor(Math.random() * jokes.length);
          const joke = jokes[randomIndex];
          return joke.setup + ' ' + joke.punchline;
        },
        
        quote: () => {
          const randomIndex = Math.floor(Math.random() * quotes.length);
          const quote = quotes[randomIndex];
          return `${quote.quote} - ${quote.author}`;
        },
        roll: () => `You rolled a ${Math.floor(Math.random() * 6) + 1}.`,
        '8ball': (args) => {
            const responses = [
                'It is certain.',
                'It is decidedly so.',
                'Without a doubt.',
                'Yes - definitely.',
                'You may rely on it.',
                'As I see it, yes.',
                'Most likely.',
                'Outlook good.',
                'Yes.',
                'Signs point to yes.',
                'Reply hazy, try again.',
                'Ask again later.',
                'Better not tell you now.',
                'Cannot predict now.',
                'Concentrate and ask again.',
                'Don\'t count on it.',
                'My reply is no.',
                'My sources say no.',
                'Outlook not so good.',
                'Very doubtful.',
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        },
        console: (args) => {
          if (args.length === 0) {
            return 'Usage: console <javascript code>';
          }
        
          // Input validation
          const userInput = args.join(' ');
          const disallowedKeywords = ['eval', 'Function', 'constructor', 'prototype'];
          const disallowedRegex = new RegExp(disallowedKeywords.join('|'), 'i');
        
          if (disallowedRegex.test(userInput)) {
            return 'Error: Disallowed keyword detected in input.';
          }
        
          try {
            const result = eval(userInput);
            return result === undefined ? '' : `=> ${result}`;
          } catch (error) {
            return `Error: ${error.message}`;
          }
        },
        editor: () => 'Text editor not implemented.',
    };

    commandInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            processInput();
        }
    });

    commandInput.addEventListener('blur', () => {
        setTimeout(() => commandInput.focus(), 0);
    });

    function processInput() {
        const inputText = commandInput.value.trim();
        if (inputText) {
          processCommand(inputText);
          commandInput.value = ''; // Clear the input field
          commandInput.focus(); // Focus back on the input field
        }
      }

    function processCommand(input) {
        const parts = input.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        let output = '';
        if (commands[command]) {
            output = typeof commands[command] === 'function' ? commands[command](args) : commands[command];
        } else {
            output = `Command not found: ${command}`;
        }

        if (output) {
            appendOutput(input, output);
        }
    }

    function appendOutput(input, output) {
      const inputLine = document.createElement('div');
      const promptSpan = document.createElement('span');
      promptSpan.className = 'prompt';
    
      const usernameSpan = document.createElement('span');
      usernameSpan.id = 'username';
      usernameSpan.textContent = 'visitor'; 
      promptSpan.appendChild(usernameSpan);
    
      const atSymbolSpan = document.createElement('span');
      atSymbolSpan.textContent = '@'; 
      promptSpan.appendChild(atSymbolSpan);
    
      const hostSpan = document.createElement('span');
      hostSpan.id = 'host';
      hostSpan.textContent = 'CloudOS'; 
      promptSpan.appendChild(hostSpan);
      
      const colonSpan = document.createElement('span');
      colonSpan.textContent = ':'; 
      promptSpan.appendChild(colonSpan);
    
      const tildaSpan = document.createElement('span');
      tildaSpan.id = 'tilda';
      tildaSpan.textContent = '~'; 
      promptSpan.appendChild(tildaSpan);
    
      const dollarSignSpan = document.createElement('span');
      dollarSignSpan.textContent = '$ '; 
      promptSpan.appendChild(dollarSignSpan);
    
      inputLine.appendChild(promptSpan);
      inputLine.appendChild(document.createTextNode(input));
      outputDiv.appendChild(inputLine);
    
      const outputLine = document.createElement('div');
      outputLine.innerHTML = output; // Use innerHTML instead of textContent
      outputDiv.appendChild(outputLine);
    
      outputDiv.scrollTop = outputDiv.scrollHeight;
    }

    commandInput.focus();
});

// took me 6 days (including the w3schools course) crazy
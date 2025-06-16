const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load ideas database
const ideasFilePath = path.join(__dirname, 'data', 'ideas.json');
let ideasDB = [];

// Check if ideas.json exists, if not create it
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

if (!fs.existsSync(ideasFilePath)) {
  // Create initial database with sample ideas
  ideasDB = [
    {
      id: '1',
      title: 'Virtual Scavenger Hunt',
      description: 'Create a virtual scavenger hunt where fans look for digital "items" across your website and social media channels.',
      category: ['digital', 'contest'],
      budgetRange: ['low', 'medium'],
      audienceTypes: ['families', 'young-adults', 'casual-attendees'],
      organizationTypes: ['sports-team', 'event', 'brand'],
      implementationDifficulty: 2,
      estimatedTimeToImplement: '3 weeks',
      successMetrics: ['increased website traffic', 'social media engagement'],
      exampleImplementations: ['The LA Lakers created a digital scavenger hunt where fans searched for iconic team moments hidden across their website and social platforms.']
    },
    {
      id: '2',
      title: 'Fan Content Creation Contest',
      description: 'Ask fans to submit videos, art, or photos celebrating your brand/team for a chance to be featured.',
      category: ['social-media', 'user-generated-content'],
      budgetRange: ['low'],
      audienceTypes: ['young-adults', 'die-hard-fans'],
      organizationTypes: ['sports-team', 'brand', 'entertainment'],
      implementationDifficulty: 1,
      estimatedTimeToImplement: '2 weeks',
      successMetrics: ['social media engagement', 'content submissions'],
      exampleImplementations: ['The Golden State Warriors asked fans to submit creative team celebrations, featuring the best ones on their jumbotron.']
    },
    {
      id: '3',
      title: 'Behind-the-Scenes Day',
      description: 'Invite select fans for a behind-the-scenes tour of facilities or operations.',
      category: ['event', 'exclusive-access'],
      budgetRange: ['medium'],
      audienceTypes: ['die-hard-fans', 'families'],
      organizationTypes: ['sports-team', 'event', 'entertainment'],
      implementationDifficulty: 3,
      estimatedTimeToImplement: '1 month',
      successMetrics: ['fan satisfaction', 'social sharing'],
      exampleImplementations: ['The Miami Heat offered season ticket holders exclusive locker room tours and practice viewing opportunities.']
    },
    {
      id: '4',
      title: 'Community Service Initiative',
      description: 'Organize a community service event where fans can volunteer alongside team members or brand representatives.',
      category: ['community', 'brand-building'],
      budgetRange: ['medium'],
      audienceTypes: ['families', 'young-adults'],
      organizationTypes: ['sports-team', 'brand'],
      implementationDifficulty: 3,
      estimatedTimeToImplement: '2 months',
      successMetrics: ['participation rate', 'brand sentiment'],
      exampleImplementations: ['The Seattle Seahawks created a community cleanup day where fans worked alongside practice squad players.']
    },
    {
      id: '5',
      title: 'Augmented Reality Experiences',
      description: 'Create AR experiences that enhance the in-person experience with interactive elements.',
      category: ['technology', 'in-venue'],
      budgetRange: ['high'],
      audienceTypes: ['young-adults', 'casual-attendees'],
      organizationTypes: ['sports-team', 'event', 'entertainment'],
      implementationDifficulty: 4,
      estimatedTimeToImplement: '3 months',
      successMetrics: ['app downloads', 'user engagement'],
      exampleImplementations: ['The Orlando Magic created an AR app that let fans point their phones at player jerseys to see career highlights.']
    },
    {
      id: '6',
      title: 'Personalized Milestone Recognition',
      description: 'Send personalized messages or small gifts to fans on their birthdays or "fan anniversaries."',
      category: ['fan-appreciation', 'loyalty'],
      budgetRange: ['low', 'medium'],
      audienceTypes: ['die-hard-fans'],
      organizationTypes: ['sports-team', 'brand', 'entertainment'],
      implementationDifficulty: 2,
      estimatedTimeToImplement: '1 month',
      successMetrics: ['fan retention', 'social sharing'],
      exampleImplementations: ['The Dallas Mavericks send personalized videos from the mascot to fans on their birthdays.']
    },
    {
      id: '7',
      title: 'Pop-Up Events',
      description: 'Create unexpected pop-up events in different locations to engage fans outside normal venues.',
      category: ['guerrilla-marketing', 'community'],
      budgetRange: ['medium'],
      audienceTypes: ['young-adults', 'casual-attendees'],
      organizationTypes: ['sports-team', 'brand', 'entertainment'],
      implementationDifficulty: 3,
      estimatedTimeToImplement: '1 month',
      successMetrics: ['attendance', 'social media mentions'],
      exampleImplementations: ['The Toronto Raptors created pop-up basketball courts in unexpected city locations with players making surprise appearances.']
    },
    {
      id: '8',
      title: 'Interactive Prediction Games',
      description: 'Develop games where fans can predict outcomes and win prizes based on actual results.',
      category: ['gaming', 'digital'],
      budgetRange: ['medium'],
      audienceTypes: ['die-hard-fans', 'young-adults'],
      organizationTypes: ['sports-team', 'event'],
      implementationDifficulty: 3,
      estimatedTimeToImplement: '2 months',
      successMetrics: ['participation rate', 'return visits'],
      exampleImplementations: ['The Philadelphia Eagles created a pick-em contest where fans predicted game statistics for chances to win merchandise.']
    },
    {
      id: '9',
      title: 'Fan Advisory Board',
      description: 'Create an exclusive group of fans who provide regular feedback on initiatives and feel involved in decision-making.',
      category: ['feedback', 'community-building'],
      budgetRange: ['low'],
      audienceTypes: ['die-hard-fans'],
      organizationTypes: ['sports-team', 'brand', 'entertainment'],
      implementationDifficulty: 2,
      estimatedTimeToImplement: '1 month',
      successMetrics: ['quality of feedback', 'fan satisfaction'],
      exampleImplementations: ['The Portland Trail Blazers created a 30-person fan council that meets quarterly with executives.']
    },
    {
      id: '10',
      title: 'Co-Created Merchandise',
      description: 'Allow fans to vote on or even submit designs for limited edition merchandise.',
      category: ['merchandise', 'user-generated-content'],
      budgetRange: ['medium', 'high'],
      audienceTypes: ['die-hard-fans', 'young-adults'],
      organizationTypes: ['sports-team', 'brand'],
      implementationDifficulty: 3,
      estimatedTimeToImplement: '3 months',
      successMetrics: ['design submissions', 'merchandise sales'],
      exampleImplementations: ['The Chicago Bulls ran a contest where fans designed an alternate court that was used for special games.']
    }
  ];
  
  // Save to file
  fs.writeFileSync(ideasFilePath, JSON.stringify(ideasDB, null, 2));
} else {
  // Load existing ideas
  ideasDB = JSON.parse(fs.readFileSync(ideasFilePath, 'utf8'));
}

// API endpoint to get matching ideas
app.post('/api/generate-ideas', (req, res) => {
  const userInput = req.body;
  
  // Filter ideas based on user input
  const matchingIdeas = ideasDB.filter(idea => {
    // Check organization type match
    const orgMatch = idea.organizationTypes.includes(userInput.organizationType);
    
    // Check budget match
    const budgetMatch = 
      (userInput.budget === 'low' && idea.budgetRange.includes('low')) ||
      (userInput.budget === 'medium' && idea.budgetRange.includes('medium')) ||
      (userInput.budget === 'high' && idea.budgetRange.includes('high'));
    
    // Check audience match - at least one audience type should match
    const audienceMatch = userInput.audienceTypes.some(
      audienceType => idea.audienceTypes.includes(audienceType)
    );
    
    return orgMatch && budgetMatch && audienceMatch;
  });
  
  // Group ideas by category
  const groupedIdeas = {};
  matchingIdeas.forEach(idea => {
    idea.category.forEach(category => {
      if (!groupedIdeas[category]) {
        groupedIdeas[category] = [];
      }
      groupedIdeas[category].push(idea);
    });
  });
  
  res.json({
    totalIdeas: matchingIdeas.length,
    categories: Object.keys(groupedIdeas),
    groupedIdeas: groupedIdeas
  });
});

// Get all ideas (for development purposes)
app.get('/api/ideas', (req, res) => {
  res.json(ideasDB);
});

// Get a specific idea by ID
app.get('/api/ideas/:id', (req, res) => {
  const idea = ideasDB.find(idea => idea.id === req.params.id);
  if (!idea) {
    return res.status(404).json({ message: 'Idea not found' });
  }
  res.json(idea);
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
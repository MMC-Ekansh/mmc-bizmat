import { type Question } from './types';

export const QUESTION_TIME = 30; // 30 seconds per question

export const MAX_SCORE_PER_QUESTION = 3000;

export const QUESTIONS: Record<string, Question[]> = {
  "Level 1: The Stats": [
    {
      id: 'q1',
      category: 'Level 1: The Stats',
      question: "The Squad Size: How big is the team right now?",
      options: [
        "Small & Agile (5–20 people)",
        "Scaling Up (20–80 people)",
        "Large Army (80+ people)"
      ],
      points: 1000
    },
    {
      id: 'q2',
      category: 'Level 1: The Stats',
      question: "The Scoreboard (Annual Revenue): What league is the business currently playing in financially?",
      options: [
        "The Challenger League (Below ₹20 Cr)",
        "The Professional League (₹20–100 Cr)",
        "The Premier League (₹100+ Cr)"
      ],
      points: 1000
    }
  ],
  "Level 2: The Gameplay": [
    {
      id: 'q3',
      category: 'Level 2: The Gameplay',
      question: "The Decision Matrix: It’s Tuesday morning. A big decision needs to be made. What happens?",
      options: [
        "Everyone looks at me. I make the call.",
        "My leaders debate it, but they eventually text me for the final 'Yes/No.'",
        "My leaders handle it using our governance framework; I find out in the weekly review."
      ],
      points: 1000
    },
    {
      id: 'q4',
      category: 'Level 2: The Gameplay',
      question: "The Blueprint (Org Structure): If a stranger looked at your Org Chart, what would they see?",
      options: [
        "What chart? We just wear multiple hats and get it done.",
        "It exists on paper, but in reality, lines are blurry and accountability is fuzzy.",
        "A clear map where everyone knows exactly what they own and how they are measured."
      ],
      points: 1000
    },
    {
      id: 'q5',
      category: 'Level 2: The Gameplay',
      question: "The Playbook (Processes): If you went on a silent retreat for 2 weeks, how does work get done?",
      options: [
        "Tribal knowledge—people just 'know' (or they call me).",
        "We have SOPs, but people mostly ignore them or do it their own way.",
        "Like a Swiss watch—processes are documented, standardized, and followed."
      ],
      points: 1000
    },
    {
      id: 'q6',
      category: 'Level 2: The Gameplay',
      question: "The Boss Battle (Primary Challenge): What is the one monster keeping you awake at night right now?",
      options: [
        "Survival Mode: Stabilizing cash flow and stopping the chaos.",
        "Growing Pains: Hiring the right people and getting departments to talk to each other.",
        "Velocity: Breaking down silos to make the whole elephant dance faster."
      ],
      points: 1000
    }
  ],
  "Level 3: The Engine": [
    {
      id: 'q7',
      category: 'Level 3: The Engine',
      question: "The Captain’s Chair (Dependency): If you stepped away for a month, what happens to the ship?",
      options: [
        "It sinks. I am the engine.",
        "It floats, but goes in circles. They need my navigation.",
        "It sails fine, but might miss a strategic turn."
      ],
      points: 1000
    },
    {
      id: 'q8',
      category: 'Level 3: The Engine',
      question: "The Radar (Data): How do you know if you’re winning or losing right now?",
      options: [
        "Gut feeling and checking the bank balance.",
        "I get reports, but they are usually messy or a week late.",
        "Real-time dashboards and structured reviews (we just need to act on them better)."
      ],
      points: 1000
    },
    {
      id: 'q9',
      category: 'Level 3: The Engine',
      question: "The Fuel (Sales Rhythm): Describe your sales engine.",
      options: [
        "Feast or Famine. It mostly depends on my network.",
        "We have a team, but I have no idea if they’ll hit next month's target.",
        "Predictable machine. Now we just need better margins and new markets."
      ],
      points: 1000
    }
  ],
  "Level 4: The Vibe": [
    {
      id: 'q10',
      category: 'Level 4: The Vibe',
      question: "The Squad (Culture): How much 'babysitting' does the team need?",
      options: [
        "A lot. If I don't supervise, work slows down.",
        "My leaders try, but the ownership mindset isn't consistent yet.",
        "High ownership everywhere, but sometimes they row in different directions."
      ],
      points: 1000
    },
    {
      id: 'q11',
      category: 'Level 4: The Vibe',
      question: "The Horizon (Vision): Where are your eyes focused right now?",
      options: [
        "Next week. Just keeping the lights on and customers happy.",
        "Next year. Opening new cities or launching new product lines.",
        "Next decade. Market domination, innovation, and legacy."
      ],
      points: 1000
    },
    {
      id: 'q12',
      category: 'Level 4: The Vibe',
      question: "Your Avatar (Current Role): Be honest, what is your actual job title regardless of what LinkedIn says?",
      options: [
        "Chief Firefighter (I solve problems all day).",
        "The Referee (I spend my day aligning different departments).",
        "The Architect (I spend my day designing the future)."
      ],
      points: 1000
    }
  ]
};
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    organizationType: '',
    budget: '',
    audienceTypes: [],
    goals: []
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter(item => item !== value)
      });
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const generateIdeas = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/generate-ideas', formData);
      setResults(response.data);
      setStep(4); // Move to results page
    } catch (err) {
      console.error('Error generating ideas:', err);
      setError('Failed to generate ideas. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Form steps rendering
  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="form-step">
            <h2>Tell us about your organization</h2>
            <div className="form-group">
              <label>Organization Type</label>
              <select 
                name="organizationType" 
                value={formData.organizationType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select type</option>
                <option value="sports-team">Sports Team</option>
                <option value="event">Event</option>
                <option value="brand">Brand</option>
                <option value="entertainment">Entertainment</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button 
              className="btn-primary" 
              onClick={nextStep} 
              disabled={!formData.organizationType}
            >
              Next
            </button>
          </div>
        );
      
      case 2:
        return (
          <div className="form-step">
            <h2>Who is your audience?</h2>
            <div className="form-group checkbox-group">
              <label>Audience Types (select all that apply)</label>
              <div className="checkbox-option">
                <input 
                  type="checkbox" 
                  id="families"
                  name="audienceTypes" 
                  value="families" 
                  onChange={handleCheckboxChange}
                  checked={formData.audienceTypes.includes('families')}
                />
                <label htmlFor="families">Families</label>
              </div>
              <div className="checkbox-option">
                <input 
                  type="checkbox" 
                  id="young-adults"
                  name="audienceTypes" 
                  value="young-adults" 
                  onChange={handleCheckboxChange}
                  checked={formData.audienceTypes.includes('young-adults')}
                />
                <label htmlFor="young-adults">Young Adults (18-35)</label>
              </div>
              <div className="checkbox-option">
                <input 
                  type="checkbox" 
                  id="die-hard-fans"
                  name="audienceTypes" 
                  value="die-hard-fans" 
                  onChange={handleCheckboxChange}
                  checked={formData.audienceTypes.includes('die-hard-fans')}
                />
                <label htmlFor="die-hard-fans">Die-Hard Fans</label>
              </div>
              <div className="checkbox-option">
                <input 
                  type="checkbox" 
                  id="casual-attendees"
                  name="audienceTypes" 
                  value="casual-attendees" 
                  onChange={handleCheckboxChange}
                  checked={formData.audienceTypes.includes('casual-attendees')}
                />
                <label htmlFor="casual-attendees">Casual Attendees</label>
              </div>
            </div>
            <div className="button-group">
              <button className="btn-secondary" onClick={prevStep}>Back</button>
              <button 
                className="btn-primary"
                onClick={nextStep}
                disabled={formData.audienceTypes.length === 0}
              >
                Next
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="form-step">
            <h2>What's your budget?</h2>
            <div className="form-group">
              <label>Budget Range</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input 
                    type="radio" 
                    id="budget-low"
                    name="budget" 
                    value="low" 
                    onChange={handleInputChange}
                    checked={formData.budget === 'low'}
                  />
                  <label htmlFor="budget-low">Low (Under $5,000)</label>
                </div>
                <div className="radio-option">
                  <input 
                    type="radio" 
                    id="budget-medium"
                    name="budget" 
                    value="medium" 
                    onChange={handleInputChange}
                    checked={formData.budget === 'medium'}
                  />
                  <label htmlFor="budget-medium">Medium ($5,000 - $20,000)</label>
                </div>
                <div className="radio-option">
                  <input 
                    type="radio" 
                    id="budget-high"
                    name="budget" 
                    value="high" 
                    onChange={handleInputChange}
                    checked={formData.budget === 'high'}
                  />
                  <label htmlFor="budget-high">High (Over $20,000)</label>
                </div>
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-group">
              <button className="btn-secondary" onClick={prevStep}>Back</button>
              <button 
                className="btn-primary"
                onClick={generateIdeas}
                disabled={!formData.budget || loading}
              >
                {loading ? 'Generating...' : 'Generate Ideas'}
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="results-page">
            <h2>Your Fan Engagement Ideas</h2>
            {results && (
              <div className="results-container">
                <p className="results-summary">
                  We found {results.totalIdeas} ideas across {results.categories.length} categories.
                </p>
                
                {results.categories.length > 0 ? (
                  results.categories.map(category => (
                    <div key={category} className="category-section">
                      <h3>{category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h3>
                      <div className="ideas-grid">
                        {results.groupedIdeas[category].map(idea => (
                          <div key={idea.id} className="idea-card">
                            <h4>{idea.title}</h4>
                            <p>{idea.description}</p>
                            <div className="idea-meta">
                              <span className="difficulty">
                                Difficulty: {Array(idea.implementationDifficulty).fill('★').join('')}
                              </span>
                              <span className="budget">
                                Budget: {idea.budgetRange.map(b => b.charAt(0).toUpperCase() + b.slice(1)).join('/')}
                              </span>
                            </div>
                            {idea.exampleImplementations && idea.exampleImplementations.length > 0 && (
                              <div className="idea-example">
                                <em>Example: {idea.exampleImplementations[0]}</em>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <p>No ideas match your criteria. Try adjusting your selections.</p>
                  </div>
                )}
              </div>
            )}
            <button className="btn-primary" onClick={() => setStep(1)}>Start Over</button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Fan Engagement Idea Generator</h1>
        <p>Generate creative ways to connect with your audience</p>
      </header>
      
      <main className="app-main">
        {renderStep()}
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2025 Fan Engagement Idea Generator</p>
      </footer>
    </div>
  );
}

export default App;
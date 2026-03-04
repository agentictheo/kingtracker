import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

export default function App() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [score1, setScore1] = useState('')
  const [score2, setScore2] = useState('')
  const [error, setError] = useState('')

  // Load games on mount
  useEffect(() => {
    loadGames()
  }, [])

  async function loadGames() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tischtennis_games')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setGames(data || [])
    } catch (err) {
      console.error('Load error:', err)
      setError('Fehler beim Laden der Spiele')
    } finally {
      setLoading(false)
    }
  }

  async function addGame() {
    if (!score1 || !score2 || parseInt(score1) === parseInt(score2)) {
      setError('Beide Scores eingeben (keine Unentschieden)!')
      return
    }

    try {
      setError('')
      const s1 = parseInt(score1)
      const s2 = parseInt(score2)
      const winner = s1 > s2 ? 'Nicola' : 'Janis'

      const { data, error } = await supabase
        .from('tischtennis_games')
        .insert([
          {
            player1: 'Nicola',
            player2: 'Janis',
            score1: s1,
            score2: s2,
            winner,
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) throw error

      setGames([data[0], ...games])
      setScore1('')
      setScore2('')
    } catch (err) {
      console.error('Add error:', err)
      setError('Fehler beim Hinzufügen des Spiels')
    }
  }

  async function deleteGame(id) {
    try {
      const { error } = await supabase
        .from('tischtennis_games')
        .delete()
        .eq('id', id)

      if (error) throw error

      setGames(games.filter(g => g.id !== id))
    } catch (err) {
      console.error('Delete error:', err)
      setError('Fehler beim Löschen')
    }
  }

  const nicolaWins = games.filter(g => g.winner === 'Nicola').length
  const janisWins = games.filter(g => g.winner === 'Janis').length

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">👑 King Tracker</h1>
          <button
            className="dark-mode-btn"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Error Message */}
        {error && (
          <div className="error-banner">
            <p>{error}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="card">
          <h2>Neues Spiel</h2>
          <div className="form-section">
            <input
              type="number"
              placeholder="Nicola Punkte"
              value={score1}
              onChange={(e) => setScore1(e.target.value)}
              min="0"
              max="20"
              className="input"
            />
            <input
              type="number"
              placeholder="Janis Punkte"
              value={score2}
              onChange={(e) => setScore2(e.target.value)}
              min="0"
              max="20"
              className="input"
            />
            <button className="btn btn-primary" onClick={addGame}>
              ➕ Spiel hinzufügen
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <h2>Nicola</h2>
              <div className="big-number">{nicolaWins}</div>
              <p className="subtitle">Siege</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <h2>Janis</h2>
              <div className="big-number">{janisWins}</div>
              <p className="subtitle">Siege</p>
            </div>
          </div>
        </div>

        {/* Games List */}
        <div className="card">
          <h2>Spielverlauf</h2>
          <div className="games-list">
            {loading ? (
              <p className="empty">Laden...</p>
            ) : games.length === 0 ? (
              <p className="empty">Noch keine Spiele</p>
            ) : (
              games.map((game) => (
                <div key={game.id} className="game-item">
                  <div className="game-info">
                    <span className={`badge ${game.winner === 'Nicola' ? 'green' : 'blue'}`}>
                      {game.winner} gewinnt
                    </span>
                    <span className="score">{game.score1}:{game.score2}</span>
                    <span className="date">
                      {new Date(game.created_at).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteGame(game.id)}
                    title="Löschen"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

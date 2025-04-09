import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useState, useEffect, useRef } from 'react'

export function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      console.log(isFirstInput.current)
      return
    }

    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con numeros')
      return
    }

    if (search.length < 3) {
      setError('No se puede buscar una pelicula con menos de 3 letras')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}
function App() {
  const { movies } = useMovies()
  const { search, updateSearch, error } = useSearch()

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            value={search}
            onChange={handleChange}
            type="text"
            placeholder="Avengers, Matrix, Star Wars ..."
          />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}
export default App

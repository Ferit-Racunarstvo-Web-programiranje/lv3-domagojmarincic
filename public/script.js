fetch('filmtv_movies.csv')
  .then(res => res.text())
  .then(csv => {
    const rezultat = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true
    });

    const filmovi = rezultat.data
    .slice(0, 50)
    .map(film => ({
      title: film.title,
      year: Number(film.year),
      genre: film.genre,
      duration: Number(film.duration),
      country: film.country?.split(',').map(c => c.trim()) || [],
      total_votes: Number(film.total_votes)
    }));

    prikaziTablicu(filmovi);
  })
  .catch(err => console.error('Greška pri dohvaćanju CSV-a:', err));

function prikaziTablicu(filmovi) {
  const tbody = document.querySelector('#filmovi-tablica tbody');
  tbody.innerHTML = ''; // očisti ako postoji

  for (const film of filmovi) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.year}</td>
      <td>${film.genre}</td>
      <td>${film.duration}</td>
      <td>${Array.isArray(film.country) ? film.country.join(', ') : film.country}</td>
      <td>${film.total_votes}</td>
    `;
    tbody.appendChild(row);
  }
}

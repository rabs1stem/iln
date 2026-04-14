const API = 'http://localhost:3001';

async function loadReasons() {
  const res = await fetch(`${API}/reasons`);
  const data = await res.json();

  const list = document.getElementById('list');
  list.innerHTML = '';

  data.forEach(r => {
    const li = document.createElement('li');
    li.textContent = r.text;
    list.appendChild(li);
  });
}

async function addReason() {
  const input = document.getElementById('input');

  await fetch(`${API}/reasons`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: input.value })
  });

  input.value = '';
  loadReasons();
}

loadReasons();
const API_URL = 'http://212.193.11.210:3000';
const STUDENT_ID = 1;

const headers = {
  'X-Student-Id': String(STUDENT_ID),
};

const jsonHeaders = {
  ...headers,
  'Content-Type': 'application/json',
};

async function getTodos() {
  const res = await fetch(`${API_URL}/todos`, { headers });
  return res.json();
}

async function createTodo(title) {
  const res = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ title }),
  });
  return res.json();
}

async function updateTodo(id, data) {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: jsonHeaders,
    body: JSON.stringify(data),
  });
  return res.json();
}

async function deleteTodo(id) {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
    headers,
  });
  // у DELETE может не быть JSON
  if (res.status === 204) return null;
  return res.json().catch(() => null);
}

async function main() {
  const todos = await getTodos();
  console.log('todos:', todos);

  const created = await createTodo('Новая задача из JS');
  console.log('created:', created);

  const updated = await updateTodo(created.id, { completed: true });
  console.log('updated:', updated);

  await deleteTodo(created.id);
  console.log('deleted:', created.id);
}

main();
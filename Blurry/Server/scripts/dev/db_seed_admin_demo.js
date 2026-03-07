const mysql = require('mysql2/promise');
require('dotenv').config();

async function tableCount(conn, table) {
  const [rows] = await conn.query('SELECT COUNT(*) AS c FROM ??', [table]);
  return Number(rows[0].c || 0);
}

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'blurry',
    connectTimeout: 5000,
  });

  const [userRows] = await conn.query('SELECT id FROM users ORDER BY id ASC LIMIT 2');
  const userA = userRows[0]?.id || 1;
  const userB = userRows[1]?.id || userA;

  const [matchRows] = await conn.query('SELECT id FROM matches ORDER BY id ASC LIMIT 1');
  let matchId = matchRows[0]?.id;

  if (!matchId) {
    await conn.query(
      'INSERT INTO matches (user_a_id, user_b_id, score, status) VALUES (?, ?, ?, ?)',
      [userA, userB, 88, 'mutual'],
    );
    const [newMatch] = await conn.query('SELECT id FROM matches ORDER BY id DESC LIMIT 1');
    matchId = newMatch[0]?.id;
  }

  if ((await tableCount(conn, 'services_status')) === 0) {
    await conn.query(
      'INSERT INTO services_status (nombre, estado, price) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)',
      ['Chat', 'Activo', 6.99, 'Matching', 'Activo', 11.99, 'Videollamada', 'Mantenimiento', 8.99],
    );
  }

  if ((await tableCount(conn, 'feedback')) === 0) {
    await conn.query(
      'INSERT INTO feedback (user_id, match_id, rating, comment) VALUES (?, ?, ?, ?), (?, ?, ?, ?)',
      [userA, matchId, 5, 'Buen emparejamiento', userB, matchId, 4, 'Experiencia positiva'],
    );
  }

  if ((await tableCount(conn, 'activity_logs')) === 0) {
    await conn.query(
      'INSERT INTO activity_logs (user_id, action, metadata) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)',
      [
        userA,
        'session_end',
        JSON.stringify({ durationMinutes: 21 }),
        userB,
        'session_end',
        JSON.stringify({ durationMinutes: 14 }),
        userA,
        'session_end',
        JSON.stringify({ durationMinutes: 33 }),
      ],
    );
  }

  if ((await tableCount(conn, 'reports')) === 0) {
    await conn.query(
      'INSERT INTO reports (reported_user_id, type, status, admin_notes) VALUES (?, ?, ?, ?), (?, ?, ?, ?)',
      [
        userB,
        'conducta',
        'Pendiente',
        'Revision inicial',
        userA,
        'spam',
        'Resuelto',
        'Sin reincidencia',
      ],
    );
  }

  if ((await tableCount(conn, 'sanctions')) === 0) {
    await conn.query(
      'INSERT INTO sanctions (user_id, usuario, sancion, estado) VALUES (?, ?, ?, ?)',
      [userB, `user-${userB}`, 'Advertencia formal', 'Activa'],
    );
  }

  const tables = ['matches', 'services_status', 'feedback', 'activity_logs', 'reports', 'sanctions'];
  console.log('SEED_OK');
  for (const table of tables) {
    const count = await tableCount(conn, table);
    console.log(`${table}: ${count}`);
  }

  await conn.end();
}

main().catch((error) => {
  console.error('SEED_ERROR', error.code || error.message);
  process.exit(1);
});

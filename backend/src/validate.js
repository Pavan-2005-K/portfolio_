// Server-side validation for the contact form. Returns { errors, values }.
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// strips control characters except newline/tab
const clean = (s) => s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();

function validateContact(body) {
  const errors = {};
  const values = {};
  const rules = {
    name: { min: 2, max: 100, label: 'Name' },
    email: { min: 5, max: 254, label: 'Email' },
    subject: { min: 2, max: 150, label: 'Subject' },
    message: { min: 10, max: 2000, label: 'Message' },
  };

  for (const [field, r] of Object.entries(rules)) {
    const raw = body ? body[field] : undefined;
    // Rejects objects/arrays (blocks NoSQL operator injection like {"$gt":""})
    if (typeof raw !== 'string') {
      errors[field] = `${r.label} is required`;
      continue;
    }
    const v = clean(raw);
    if (v.length < r.min) errors[field] = `${r.label} must be at least ${r.min} characters`;
    else if (v.length > r.max) errors[field] = `${r.label} must be at most ${r.max} characters`;
    else if (field === 'email' && !emailRegex.test(v)) errors[field] = 'Email is not valid';
    else values[field] = v;
  }
  return { errors, values };
}

module.exports = { validateContact };

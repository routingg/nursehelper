# nursehelper

A simple Django web app that provides quick nursing/clinical calculators for IV infusion time, infusion rate, and drug dosage.

## Features

- **Infusion calculator** — enter start/end time and total volume (mL) to get mL/hr, gtt/min, and seconds per drop
- **IV time calculator** — calculate IV infusion duration
- **Drug dosage calculator** — concentration (mg/mL), required volume (mL), infusion rate (mL/hr), and mg/hr conversions
- **Formulas / cheat sheet** — quick reference tables and calculators for volume-time-rate and rate-to-drop conversions

## Requirements

- Python 3.8+
- pip
- (recommended) a virtual environment (`venv` or `virtualenv`)

## Setup

1. Clone the repository or move into this directory.

2. Create and activate a virtual environment.

   Windows PowerShell:
   ```
   python -m venv venv
   venv\Scripts\Activate.ps1
   ```

   Git Bash / WSL:
   ```
   python -m venv venv
   source venv/Scripts/activate
   ```

3. Install dependencies.
   ```
   pip install -r requirements.txt
   ```

4. Create your local `.env` from the template and fill in a real secret key.
   ```
   cp .env.example .env
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```
   Paste the generated key as `SECRET_KEY` in `.env`, and set `DEBUG=True` and `ALLOWED_HOSTS=127.0.0.1,localhost` for local development. Never commit `.env`.

5. Run database migrations.
   ```
   python manage.py migrate
   ```

6. (Optional) create a superuser.
   ```
   python manage.py createsuperuser
   ```

7. Start the development server.
   ```
   python manage.py runserver
   ```

## Testing

```
python manage.py test
```

## Database

By default the project uses SQLite (`db.sqlite3`). To use a different database, update the `DATABASES` setting in `nursehelper/settings.py`.

## Project structure

- `calc/` — core app (models, views, templates)
- `nursehelper/` — Django project settings
- `db.sqlite3` — default local database

Templates used by the views live under `calc/templates/calc/`.

## Deployment (Render example)

This repo is public, so **never commit `.env`, `*.pem`, `*.key`, or `db.sqlite3`** — they're already covered by `.gitignore`. Copy `.env.example` to `.env` locally and fill in real values; only the `.example` file (no secrets) is committed.

1. Push this repo to GitHub (already done via `origin`).
2. On [Render](https://render.com), create a **New Web Service** from the GitHub repo.
3. Build command: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
4. Start command: `gunicorn nursehelper.wsgi:application` (matches the `Procfile`)
5. Add environment variables in the Render dashboard (never in code):
   - `SECRET_KEY` — generate a new one, e.g. `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
   - `DEBUG=False`
   - `ALLOWED_HOSTS=your-app.onrender.com`
   - `CSRF_TRUSTED_ORIGINS=https://your-app.onrender.com`
6. Add a **Pre-Deploy Command** (or run once via the Render shell): `python manage.py migrate`
7. If you ever need an admin login, run `python manage.py createsuperuser` via the Render shell rather than committing credentials.

Railway works the same way — it auto-detects the `Procfile` — set the same environment variables in its dashboard.

## Contributing

Contributions are welcome. Please open an issue or pull request with your proposed changes.

## License

No license has been applied to this project yet. Add one if you intend to distribute or open-source it.

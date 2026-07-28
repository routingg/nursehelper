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

4. Run database migrations.
   ```
   python manage.py migrate
   ```

5. (Optional) create a superuser.
   ```
   python manage.py createsuperuser
   ```

6. Start the development server.
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

## Contributing

Contributions are welcome. Please open an issue or pull request with your proposed changes.

## License

No license has been applied to this project yet. Add one if you intend to distribute or open-source it.

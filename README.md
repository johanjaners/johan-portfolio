# Johan Portfolio

## CV generation

The downloadable CV is generated from `scripts/generate-cv.py` and committed to `public/johan-janers-cv.pdf`.

Install the pinned Python dependency:

```powershell
npm run cv:install
```

Generate the PDF:

```powershell
npm run cv:generate
```

If `python` is not available on Windows, use the same commands with `py` directly:

```powershell
py -m pip install -r requirements-cv.txt
py scripts/generate-cv.py
```

The generated PDF is served by the portfolio through `/johan-janers-cv.pdf`.

"""Rebuild house frameworks in isolation and compare with approved files."""
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

ROOT=Path(__file__).resolve().parents[1]
with tempfile.TemporaryDirectory() as directory:
    isolated=Path(directory)
    (isolated/'scripts').mkdir()
    for name in ('new_house_assets.py','svgkit.py'):
        shutil.copyfile(ROOT/'scripts'/name,isolated/'scripts'/name)
    subprocess.run([sys.executable,str(isolated/'scripts/new_house_assets.py')],check=True)
    generated=sorted((isolated/'assets').glob('house.*.svg'))
    assert len(generated)==15
    for file in generated:
        assert file.read_bytes()==(ROOT/'assets'/file.name).read_bytes(),file.name+' differs from the approved framework'
print('PASS: all 15 regenerated house frameworks exactly match the approved SVGs')

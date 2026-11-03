"""Compatibility entry point: always build the current universal engine."""
from pathlib import Path
import runpy
runpy.run_path(str(Path(__file__).with_name('build-v3.py')),run_name='__main__')

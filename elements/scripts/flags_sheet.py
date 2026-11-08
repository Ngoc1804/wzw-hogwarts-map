"""Rasterize every SVG with system librsvg for a visual contact sheet (no browser)."""
from pathlib import Path
import ctypes as C, ctypes.util, io, json, math
from PIL import Image, ImageDraw, ImageFont, ImageChops
ROOT=Path(__file__).resolve().parents[1]
r=C.CDLL(ctypes.util.find_library('rsvg-2'));c=C.CDLL(ctypes.util.find_library('cairo'));g=C.CDLL(ctypes.util.find_library('gobject-2.0'))
r.rsvg_handle_new_from_data.argtypes=[C.c_char_p,C.c_size_t,C.c_void_p];r.rsvg_handle_new_from_data.restype=C.c_void_p
c.cairo_image_surface_create.argtypes=[C.c_int,C.c_int,C.c_int];c.cairo_image_surface_create.restype=C.c_void_p
c.cairo_create.argtypes=[C.c_void_p];c.cairo_create.restype=C.c_void_p
c.cairo_set_source_rgb.argtypes=[C.c_void_p,C.c_double,C.c_double,C.c_double];c.cairo_paint.argtypes=[C.c_void_p]
c.cairo_surface_write_to_png.argtypes=[C.c_void_p,C.c_char_p];c.cairo_destroy.argtypes=[C.c_void_p];c.cairo_surface_destroy.argtypes=[C.c_void_p]
g.g_object_unref.argtypes=[C.c_void_p]
class Rect(C.Structure):_fields_=[('x',C.c_double),('y',C.c_double),('width',C.c_double),('height',C.c_double)]
r.rsvg_handle_render_document.argtypes=[C.c_void_p,C.c_void_p,C.POINTER(Rect),C.c_void_p];r.rsvg_handle_render_document.restype=C.c_int
data=json.loads((ROOT/'catalog.json').read_text());elements=sorted([a for a in data['elements'] if a['id'].startswith('flag.')],key=lambda a:(a['category'],a['name']))
W,H,COLS=215,185,6
sheet=Image.new('RGB',(COLS*W,math.ceil(len(elements)/COLS)*H),'#f2e8d4');draw=ImageDraw.Draw(sheet)
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',11)
for i,a in enumerate(elements):
 raw=a['svg'].encode();handle=r.rsvg_handle_new_from_data(raw,len(raw),None);assert handle,a['id']
 surf=c.cairo_image_surface_create(0,W,140);ctx=c.cairo_create(surf);c.cairo_set_source_rgb(ctx,.95,.91,.83);c.cairo_paint(ctx)
 assert r.rsvg_handle_render_document(handle,ctx,C.byref(Rect(10,6,W-20,128)),None),a['id']
 png=ROOT/'docs'/'.temp-element.png';c.cairo_surface_write_to_png(surf,str(png).encode());img=Image.open(png).convert('RGB');img.load()
 difference=ImageChops.difference(img,Image.new('RGB',img.size,img.getpixel((0,0))))
 assert difference.getbbox(), f'Blank asset after rendering: {a["id"]}'
 x,y=(i%COLS)*W,(i//COLS)*H;sheet.paste(img,(x,y));draw.text((x+8,y+142),a['name'][:30],fill='#403a30',font=font);draw.text((x+8,y+160),a['id'][-8:]+' / '+a['category'],fill='#776c59',font=font)
 c.cairo_destroy(ctx);c.cairo_surface_destroy(surf);g.g_object_unref(handle)
png.unlink(missing_ok=True);sheet.save(ROOT/'docs/six-flags.png')
print(f'Rendered {len(elements)} SVGs successfully to docs/contact-sheet.png')

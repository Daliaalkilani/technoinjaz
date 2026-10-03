from PIL import Image, ImageDraw, ImageFilter, ImageFont
W, H = 1200, 630
ROOT = '/root/technoinjaz'

# Background: deep navy base with soft cyan/blue glow (site identity)
bg = Image.new('RGB', (W, H), (5, 8, 20))
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
g = ImageDraw.Draw(glow)
g.ellipse((W/2-430, 20, W/2+430, 560), fill=(0, 150, 220, 70))
g.ellipse((W/2-260, 90, W/2+260, 470), fill=(20, 220, 200, 60))
glow = glow.filter(ImageFilter.GaussianBlur(110))
bg = Image.alpha_composite(bg.convert('RGBA'), glow)

# Subtle grid like the footer
grid = Image.new('RGBA', (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(grid)
for x in range(0, W, 48):
    gd.line([(x, 0), (x, H)], fill=(255, 255, 255, 9))
for y in range(0, H, 48):
    gd.line([(0, y), (W, y)], fill=(255, 255, 255, 9))
bg = Image.alpha_composite(bg, grid)

# Logo centered
logo = Image.open(f'{ROOT}/public/images/brand/logo-full.png').convert('RGBA')
lh = 380
lw = round(logo.width * lh / logo.height)
logo = logo.resize((lw, lh), Image.LANCZOS)
lx, ly = (W - lw)//2, 55
shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
shadow.paste((0, 210, 255, 90), (lx, ly), logo.split()[3])
shadow = shadow.filter(ImageFilter.GaussianBlur(28))
bg = Image.alpha_composite(bg, shadow)
bg.alpha_composite(logo, (lx, ly))

# Wordmark
d = ImageDraw.Draw(bg)
ar = ImageFont.truetype('/usr/share/fonts/truetype/noto/NotoKufiArabic-Bold.ttf', 62, layout_engine=ImageFont.Layout.RAQM)
en = ImageFont.truetype('/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf', 26)
d.text((W/2, 495), 'تكنو إنجاز', font=ar, fill=(255, 255, 255), anchor='mm', direction='rtl', language='ar')
d.text((W/2, 572), 'T E C H N O   E N J A Z', font=en, fill=(120, 220, 240), anchor='mm')

bg.convert('RGB').save(f'{ROOT}/public/og-image.png', optimize=True)

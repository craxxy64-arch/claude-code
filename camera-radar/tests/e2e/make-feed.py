"""
Builds a Y4M clip for Chrome's fake camera (--use-file-for-fake-video-capture).
Real photographs (COCO-SSD demo images from tensorflow/tfjs-models) are cut into
sprites and animated so the detector sees genuine objects moving:
  * a beagle that enters from the LEFT, walks right and leaves via the RIGHT
  * a beagle that stays still (stationary target)
  * a person walking slowly left, then making a sudden fast move
Usage: python make-feed.py <image1.jpg> <image2.jpg> <out.y4m>
"""
import math
import sys

from PIL import Image, ImageDraw, ImageFilter

img1, img2, out = sys.argv[1:4]
W, H, FPS, N = 640, 480, 15, 240

beach = Image.open(img1).convert("RGB")
dogs = Image.open(img2).convert("RGB")

# Background: soft room-like gradient with texture.
bg = Image.new("RGB", (W, H))
d = ImageDraw.Draw(bg)
for y in range(H):
    c = int(70 + 60 * y / H)
    d.line([(0, y), (W, y)], fill=(c, c - 6, c - 14))
d.rectangle([0, 360, W, H], fill=(96, 90, 84))
bg = bg.filter(ImageFilter.GaussianBlur(1))

dog_static = dogs.crop((12, 18, 190, 342)).resize((124, 226))
dog_walk = dogs.crop((236, 40, 590, 366)).resize((236, 217))
person = beach.crop((44, 266, 80, 342)).resize((108, 228), Image.LANCZOS)

def to_yuv420(im):
    ycbcr = im.convert("YCbCr")
    y, cb, cr = ycbcr.split()
    cb = cb.resize((W // 2, H // 2), Image.BILINEAR)
    cr = cr.resize((W // 2, H // 2), Image.BILINEAR)
    return y.tobytes() + cb.tobytes() + cr.tobytes()

with open(out, "wb") as f:
    f.write(f"YUV4MPEG2 W{W} H{H} F{FPS}:1 Ip A1:1 C420jpeg\n".encode())
    for i in range(N):
        frame = bg.copy()
        frame.paste(dog_static, (18, 250))
        # Person: slow drift left, sudden jump right at frames 170-178.
        px = 470 - i * 0.9
        if 170 <= i < 178:
            px += (i - 170) * 22
        elif i >= 178:
            px += 8 * 22 - (i - 178) * 0.9
        py = 150 + 6 * math.sin(i / 12)
        frame.paste(person, (int(px), int(py)))
        # Walking dog: enters from the left, leaves to the right.
        dx = -236 + i * 6
        if dx < W:
            frame.paste(dog_walk, (int(dx), 262))
        f.write(b"FRAME\n")
        f.write(to_yuv420(frame))
        if i in (0, 60, 120, 175):
            frame.save(out.replace(".y4m", f"-{i}.png"))
print("wrote", out)

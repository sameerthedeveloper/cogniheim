"""Writes the camera track for src/flute/scenes/cogniheim-tour.scene.json.

One shot per section. Each stop: (time_s, y, x, z, rotateX, rotateY, rotateZ).
A shot is held across its two stops; the move to the next shot is the gap
between them, eased by Flute's "cinematic" curve.
"""
import json, sys

D = 96000
S = [
    # hero — wide, left side near
    (0.0, 0, -40, 0, 8, -24, 0), (4.0, 0, -40, 0, 8, -24, 0),
    # work — near-frontal push-in
    (7.5, 1010, -300, -100, 3, -8, 0), (18.0, 1010, -300, -100, 3, -8, 0),
    # capabilities — mirrored: right side near
    (22.0, 2070, -430, 0, 6, 16, 0), (28.0, 2070, -430, 0, 6, 16, 0),
    # philosophy — frontal, tight
    (31.0, 3060, -380, -120, 2, 0, 0), (33.5, 3060, -380, -120, 2, 0, 0),
    # process — left side near, slight roll
    (36.5, 3890, -160, 0, 5, -16, -1), (46.0, 3890, -160, 0, 5, -16, -1),
    # labs — gentle right
    (48.5, 4790, -300, 130, 4, 6, 0), (50.0, 4790, -300, 130, 4, 6, 0),
    # about — flat frontal
    (52.5, 5330, -400, 0, 0, -2, 0), (55.0, 5330, -400, 0, 0, -2, 0),
    # faq — right side near
    (58.5, 6070, -360, 170, 5, 8, 0), (66.5, 6070, -360, 170, 5, 8, 0),
    # contact — left near, close
    (70.0, 6970, -170, -40, 4, -12, 0), (84.5, 6970, -170, -40, 4, -12, 0),
    # footer — slight right, then hold
    (87.5, 7480, -370, 0, 3, 8, 0), (93.5, 7480, -370, 0, 3, 8, 0),
    (96.0, 7480, -370, 0, 3, 8, 0),
]
P = ['y', 'x', 'z', 'rotateX', 'rotateY', 'rotateZ']

path = 'src/flute/scenes/cogniheim-tour.scene.json'
d = json.load(open(path))
tracks = []
for k, prop in enumerate(P, start=1):
    kf = [{"timeMs": int(s[0] * 1000), "value": s[k], "easing": "cinematic"} for s in S]
    tracks.append({"target": {"kind": "camera"}, "property": prop, "keyframes": kf})
d['definition']['motion'] = {"durationMs": D, "speed": 1, "tracks": tracks}
d['definition']['scene']['camera'].update({"rotateY": -24, "rotateX": 8, "x": -40, "z": 0})
json.dump(d, open(path, 'w'), indent=2)
print('ok', len(S), 'stops')

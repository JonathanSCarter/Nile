from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text


def seed_items():
  products = [
    Item(
        seller='Amazon',
        price=29.99,
        discount=0,
        name='Bathrobe',
        description='Stay cozy and comfortable with this soft bathrobe after a relaxing bath or shower.',
        category='Bed and Bath',
        seller_id=2,
        image='https://cdni.llbean.net/is/image/wim/507439_74_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbprod/A0211793_2'
    ),
    Item(
        seller='Amazon',
        price=19.99,
        discount=0,
        name='Shower Curtain',
        description='Enhance your bathroom\'s décor with this stylish and waterproof shower curtain.',
        category='Bed and Bath',
        seller_id=2,
        image='https://m.media-amazon.com/images/I/71UNA8zKQ8L.__AC_SX300_SY300_QL70_FMwebp_.jpg'
    ),
    Item(
        seller='Amazon',
        price=34.99,
        discount=10,
        name='Memory Foam Pillow',
        description='Enjoy a restful night\'s sleep with this supportive and comfortable memory foam pillow.',
        category='Bed and Bath',
        seller_id=2,
        image='https://www.cosyhousecollection.com/cdn/shop/products/KBP_01_PillowSide_OnWhite_bluetag_2560x2560_crop_2_1380x1380.jpg?v=1674598091'
    ),
    Item(
        seller='Amazon',
        price=42.99,
        discount=0,
        name='Bed Sheets Set',
        description='Drift off to dreamland on these luxurious and soft bed sheets.',
        category='Bed and Bath',
        seller_id=2,
        image='data:image/webp;base64,UklGRvoDAABXRUJQVlA4IO4DAAAwHACdASqFAIUAPj0aikMiIaEYHaTMIAPEtJ2+QLZ6XR7pv3kzketxMLL+6TYrgcsRx/AabYK7COOODGDSkpITkdlQvNUG2hMf49SjlHv7Pras/CEKBS9Oari+RQUJUhuCrlAwftnq+4gSOKWJPmJDLYDpc64VeImQifEkS6/nhmoQK41IovAZMsZuo645rO7CN+8V0TL5E4PNSlJJDMZbGMUsX8pNn7lOm+h3nnCgZ9Vf0C8neOqMpsDonlL86VYtFyav5yjj/Y4gxcePjo5MeHmBlmEsXXKHey4BD3upPq9Wck3hYycSIAAA/v3WgB3Pg7mxqnPRBDbNMCjAYRxTaQesZHrMJtfK5PozRkzdNXe4m/5TZ+HxuCJiXh54pchrK6M0CBJ4nbWqzTl+RwKNehqdB8NcOG3VpZMi8CBb7pwqttSDon9nr6mt16jF2jjgcuPiP3KkiBKOg44fbCJyXhXMUiIi5SliHNbe8WzPMAPbNZe6Yn+u/AlDBjp8mVcjudYbwySvfbOYb8TQUULH/LU/zZj+t45ZewwSip7ydTxxESIbGEgO8JIbcJE6msjF1mlqi3LXMKzZAJoZ+FvBQuyNoxsypX/rgQjL19LB/meFRIoTJUw8lEQHE1gIaeabwOtSC75errdb1pd2nnV/tc6mMmfu4c1mCCuN+WpF9IRZ2l8OZ9w7LPLtUAj1yZ171Yia1MxA4Eb7j6H7vbCmC5JX5fCX9wxO5Ino8nClZ/RxaYoFlk5BFoDez+HEUhapKX1CFU6F8vAk4etTZ2ePQHkA/Q68F4dHSjBto14a7JZLPv5r1/4a4YnujIC1UV9w6Y21OPGRXil1QSgUqRS8Zg8/mKCDAcoYpwRr58LSZV8Y2MxGIzg/HF0WAyBqUolxVtU3e/TLIWS47JalBqklJ7OgQZoujqIk1nSKuEQ/7QGo14Goxa9NgoOp+/hKkSmMJ0q0NQlWWo4jeoAJ64NXXkn/Zvjs4IWhpzIrjyU9t0OMJZ52Z28u+uNQS8/GP6heS48Y7Y9E1RyWPG2jAvs5JxFGcVX8KU1vLcRtlC0R4R/tJZpdAAvtQR04r3v5WRRdxMoztvVOJiYNVV1cle7vvzQmJlajdHO1ltcXEceoKT4AE/Ll4R7retTCE7Tv0Ue8dwAMYV2Tx9HFacyYbe4mUOmhCm1KKGl0VCjwNuufO9WI/q7V5rs6yAcHN9TOfIqq/GNff/CQpgXT7OEHR1OPJXGRZM8HFkff58XNfQ7HBQi0IoIsdvATBPRHTfLwFrNapRYFXf82qs12PoqUyf6JYb4PEGid6PM2++3Rv0zUJsOTUtGcRJOrNLIAAAAA'
    ),
    Item(
        seller='Amazon',
        price=24.99,
        discount=0,
        name='Bathroom Scale',
        description='Keep track of your weight and health goals with this accurate bathroom scale.',
        category='Bed and Bath',
        seller_id=2,
        image='https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSeI6PSjFP1uurd9dQtR3cdr4wGF9ks72T5QVEBOcQs-yOB-09onmY5A_vXlkI9B9_AqXTEMLp0r4U17PMBLSHk6Wx5SoBaaUqvMGXYzyM1GG00H3gsRVlKxA&usqp=CAc'
    ),
    Item(
        seller='Amazon',
        price=49.99,
        discount=0,
        name='Electric Blanket',
        description='Stay warm and cozy during the colder months with this electric blanket.',
        category='Bed and Bath',
        seller_id=2,
        image='data:image/webp;base64,UklGRo4JAABXRUJQVlA4IIIJAADQKQCdASqFAIUAPkkijkUioiESzAVgKASEtIBqZ3n/KJ799wePz1T5jfW1H6yfYAXrD/PcAOAD9D/u/nlTelWg0j/4eYD6t9gX9c/+Z63fsp/dX2a/3SLCqiuBLfABiw4h0Axm5XpIXKDLQJWp9PlMitZX+G5SCFv6DGggTmZl85RBHtIqqlbIJeJ8mP/a+twqP8sBEQh+pm3pyOn5qC09Vo7Jn3WNTp/0Uw86tqwA5dvWN4jjJ4AZnVrfGVw8iK9p3lyC9yUhrVlzZOl6rxEVKU3RSlgtkQVqdmQWpaGHn0+ifLvig7E0mtDJ7+UbED+1LsfG1VvNga+lQXRpdzUDh7Z+dgRf6odEjQal//BsRFn9S8TgATf8Jl923Nu75vx0ZvSYvv81QC8KIiqM1G7nKvvLqeLelkCcgBTeWwWxpHBZbZyguBPdUZ7szX2SQIgZb7w1wJMAAP79gPAAASa5oh7dkTvyT4uDo5f7YjH3KO3fsz8evxn1QlGEibKKgEKt+Tphy4LvCACpDYVdr2Zd5Q/MqwaALcdu5NTfZE4AFNATLfRFjnGP1X2B6HIN76RXmGwdCJwFqyRAlFkjxOPWjpdf1Ds9cZn2oa94Rdwcv8eS3S91y6iFXukETV+/DY3Jo+9620p47GvRdYYamO6QZ9BZLlGcoLfRCoT8aB1ua4eh99fStotk+2STaytqRCkV/SNDl8AGzDi2rySD8Xys+rOfFwtG/sfO5xq6U/1Jrpx+dRbFXHA/38B/PZzvZtZGKRIbjyJstu6L73V81Wpw3+ncK14SZWZKqCrxNk3b0rNBuNAgyFVh54Tw/Zcw9/Pqw/lyXar5Ru0A1jWX6Mg4BX5/3GRetkm2oph46cup5PEvvKRGl0NKzYpQYYG9xOzmhMoHFDn8d53fIC6u5aNFjqP7rAl9t82l2+XEU07QooBJw+yLvBZrUuqBBtjfpV2Zr4OHZykPEXZASSdaktyXFaD16e4iSTShwNUz4frRs4xVTHS8MESn6LxW4G+TjVBGWTsPF1VLalGQlFFN8YPJbUB9JuUXxHQ0HxPmX9AoiKltLSSpt4mCqHzlpngUC7sISI7swh1xzLVdCc33zgNpJwg9M2LzXdetFWnDElt+Npo95d3M7JEvExIQIwn/J6d1r2+62jO8jWwZ1+Ja4F8Wi0VnjbUnGBht2OEouuTBXf7Y9664hshKgEmnpwva64BtIQIrKIFIOrozN0jlijIeU7yCaj+QZwMUcEJwPLivVMDZGXORSE9POurvSnq9MKWlyWVkeyLoKqUYHSuyunxsqma3BY5DbRXdX7UURZdY4Rf8RhZPMExpcBl6D67ILcGU3paPOYP+/mxasIZcpdO3ynkpiwvnkm6lWeTKPbspcfaTXlQ4nawAdIyJ74ddO6pIrdJ4mmJ07Xh534X4sqVDpEHj28Ql9TruWgOYK+QU/hM/qmcRN7JT4tWmfOI/11mTUNzMMIVHYmvp6X4myy+5ii/hp8vRzKsRWrRJgK6QGp7yv2GqXOJM5tLiJq/KJihA7pxFWY/BxCflcglMuyz2ns7u79Xs9oxLd+X+Wa4d/C34CP2J5fHWU8kfOf6cPM/5sTb8GSyi8G2ragchcuewjc6mzEgYKuYE2K7tMxlZa7Iad2kggP2ng3JNZ4JQ54kkhwmgyW2w51K/WLGVc5MzmvB9JjJ5IG2lnfbGvHRzGbssUio0srP5G0EcsNfcC75YqKvZxLwBwmOzeTN+6UbiwPyc7/+aeDXC+HrHzevzMGaH5T5Idi7+BADy249oq3ZsjFAoyN18lE3HRoCs7eY3yZU9cM9f9IX6TXRY5qjPIIRp6N1WJhaTlqIuNZlNgcKwROFGjSjnMw+1ytMUnJafhktFzWgRTnyAfvFw/OU/Ww3g17kcBSRzeZKHsE4YqN8DRI14ZL5NVBG5LB3HRk+khoIxDyxx6Wm3YR7SSFZx/LEB6AJF+rVtdBS0yzeBrOw8hc/J1MoXu/zHi+aX/xSQPPlwsh0BqROYe96L7tEVZs59ZRrOAydNnIOPGN03x+2ZrDmGu801wb5/aJ0UtCFNE0aePgZlIuMtAv9KH+PfEFCizlVSDl6pywVddp+ub+aUohzH0Yw1+X6Y8W9e/0G1toi++CkCAouqXWNejRdJEjMJKIzD8imkcoVG4M+OzIh8AYQbzHkXVOszR5g66J3+TT8+63xPFF1j6vzIrGJd1VU7K2roqqtYTrJANtXh3pblsTMIBNnJzt67DgWy3ppdcScRyal1WQuu5Hi1H5/r2nwWEuMePeyhA719BWoAbkJmTNd/M734lDtGXmdtDx4wUFYBA+EsUr3qzlmnpLBMpllar7GTDqXml/GbR1LTRD2Z6vXMhJy42J7k818bHCrSPtxBDrkec9n54jWkfgG9GFUTzmdCve4brvn8UlZUUB7KRHeBIbQ+MSILdym+1XqDO7kW88i+OGUOI61X3FutP+6yeMY9KdUhmus3riFL/JMINw0AM9Y10jlxKM1UZZXdu/WJ3UoP2MU+hahVs37V8VU88ue7NX44HpbDuNDzil9eQxPEipMq3FSvicaGYuC6oOijrUZCpaJHszAMq4obMKL/DXpp0MB9t2PLh3Ow1AHAEMmX3jhuTYoGRF/raHcXcBx4MBO9+2b+OArKQK6QPp2bTeY3do25atfkayQqc5J7rQTtLYdaw9im9D9tXpcY+wPUssxmcukIw+7BHaQ5H5GN5ZpdOgJxgi/lolOI0Uhzbf/B11V8r1mbJGlCpzGiacuncof4gPj/Q+WyOpo/CoQGcNBBkYKzZlWYnvcetcG5iC8H3vozfxVGYqK693Y6Lvy0L2g9r4YC4aPLOMeabFn+njV5CJe/+MtER1Xu3uf4C2qoI23DcCoPaKyNKN7DZ2ZBALxOre3FGlctK1CMEo1e2fmI7YOUkwYKtUUgL9AaUG9KXWUqA6ZpLGiHOoZnrvc46ySUxkk+SlABjy/eSgEpKPq2fHVtvsVhwOrCy3m6fVcqfwe9+KfCZDxCAB0Q62E1/7I7e89apKeF7ZinbBbMbOpanAe4tIYK66oTUel8yiCcjbS3EGoIkPe0sZBIvcWnkWCSw/0x9+BZmda41/albBptM4OxbL/xLL8u+FmWLyWZnfvbXjJ8APLslAZR4rE/+PCBb2TW/0qmBUrG5eNxrHW65HU/icXP29o/kKNUVOuzOknOgNr4ecb+nMEASeuqh7Z/gu4zaNXAAAAAAAAA'
    ),
    Item(
        seller='Amazon',
        price=16.99,
        discount=0,
        name='Hand Towels (Set of 6)',
        description='These soft and absorbent hand towels are perfect for your bathroom or kitchen.',
        category='Bed and Bath',
        seller_id=2,
        image='https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS08oz_uFVlU_RhLuNEDm10oHPxYDxWVNzspzUluOpHH44CdFwa4kjAE7AEOUxhmTs4vzwaTiGGwYmV5z3CFzNRugC3rY-Zvpz-KtgaYYI-197WWtIt4CMpAw&usqp=CAc'
    ),
    Item(
        seller='Amazon',
        price=21.99,
        discount=20,
        name='Wall Clock',
        description='Keep track of time in style with this elegant and functional wall clock.',
        category='Home Decor',
        seller_id=2,
        image='https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT7ypR5eRQZ3o6k7doz17axozYJ80UDqwpgP-MvD4_AeS3TYo6z7kQg7mQJINSji6IuPQHAJDk3FthMx2IUhlFYxnwpXHUHKbwj4XFVq-75EIXDUZOMxC9nzg&usqp=CAc'
    ),
    Item(
        seller='Amazon',
        price=18.99,
        discount=0,
        name='Laundry Hamper',
        description='Organize your laundry with this durable and collapsible laundry hamper.',
        category='Storage and Organization',
        seller_id=2,
        image='https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRY3R0g5XrPN4MJA_MBO88gGEbYG3ySxr38DkbrLVQJ839952BJc4Vn-olh2gu14KkH6BC55Et7Ce8BYbZou1Zz1RDmClpCQSVMCDq0E2njSiLK0YQ4lb8&usqp=CAc'
    ),
    Item(
        seller='Amazon',
        price=29.99,
        discount=0,
        name='Bath Towel Set (Set of 2)',
        description='Dry off in comfort with this set of three soft and plush bath towels.',
        category='Bed and Bath',
        seller_id=2,
        image='https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSndYE4wx1iIIdawK58yvOa9VxlmsMhhwkpqleIZk5Og_dDrmBmQ6OPj-Xyh93IMm1axMK7-wd5R5EDkSZU64yhBBCo0sjVFFG6MvsFU8Fpgoy_bOLTVTkj&usqp=CAc'
    ),
    Item(
        seller='Amazon',
        price=27.99,
        discount=40,
        name='Bedside Lamp',
        description='Add a warm glow to your bedroom with this stylish bedside lamp.',
        category='Home Decor',
        seller_id=2,
        image='data:image/webp;base64,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'
    ),
    Item(
        seller='Amazon',
        price=14.99,
        discount=0,
        name='Shower Caddy',
        description='Keep your shower essentials organized with this convenient and rust-resistant shower caddy.',
        category='Bed and Bath',
        seller_id=2,
        image='https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcScgiYhKJ6ydN1_h3CY65UXAYWw4YXp9zfH-E4QA4INLydBIYYW5PNhyCZAuE-n0WPzlY6Us63vrL1DH_o7pFqH8uOR9xiPqepqfIBtAs3F45LTQbI5ZS8_&usqp=CAc'
    ),
    Item(
        seller='Amazon',
        price=39.99,
        discount=0,
        name='Electric Fan',
        description='Stay cool and comfortable during hot days with this powerful electric fan.',
        category='Home Appliances',
        seller_id=2,
        image='https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRV82HoGI-PlGVo__t2ojhcUyJtBgwPk9zj5_03NbCLumr29-Nu91ID_AWZTRZ6yT1jLkjaEfearJZJMcxsg-tTZCDIvhJb60PdmWsR0hUb&usqp=CAc'
    ),
    Item(
        seller='Amazon',
        price=49.99,
        discount=5,
        name='Bedside Table',
        description='Complete your bedroom setup with this sturdy and stylish bedside table.',
        category='Furniture',
        seller_id=2,
        image='https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQqmyZvLtBLmDt07qq_2b-88O6iDeo9VaAGklO5rBwTZQnHUgVJSNNB337o08twoxvOaN6-ebnTm46Fr90_5arYP9lwGkugjp6XH7TFE2kn1wRXxJqY44QwrMTe&usqp=CAc'
    ),
    Item(
        seller='Amazon',
        price=12.99,
        discount=0,
        name='Bath Mat',
        description='Step out of the shower onto this soft and absorbent bath mat to keep your floors dry.',
        category='Bed and Bath',
        seller_id=2,
        image='https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRSJ6RCRtkT0aKVCN-noU365eXf_GVg-Aw1X5qilpO39eLDkp8cQL-HfyiAl7lO4FJQ2gWB1bBRt20-txxkEPCIPYnk0Q0TSWtmoL7TFYzTC0FyeS6Rz7cJ&usqp=CAc'
    )
  ]

  for item in products:

    db.session.add(item)

  db.session.commit()

def undo_items():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM items"))

  db.session.commit()

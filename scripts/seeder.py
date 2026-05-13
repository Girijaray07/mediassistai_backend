from db.session import get_db_connection
import pandas as pd

df = pd.read_csv('data/medicine.csv')
df.dropna(inplace=True, ignore_index=True)
# print(df.head(10), df.info())

result = (df.groupby("medical_condition")["ayurvedic_supplement"].apply(list).to_dict())

conn = get_db_connection()
cursor = conn.cursor()

for condition, supplement in result.items():
    cursor.execute("""
    INSERT INTO medicine (medical_condition, ayurvedic_supplements)
    VALUES(%s, %s)
    """, (condition, supplement))
    print(f"{condition} | {supplement} inserted successfully")

conn.commit()
cursor.close()
conn.close()

# result.to_sql("medicine", get_db_connection(), if_exists="replace", index=False, schema="public")

# cursor.execute('SELECT * FROM medication')
# data = cursor.fetchall()
# print(len(data), type(data[0]), data[0])
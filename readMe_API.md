![ERD](./pic//prisma-erd.svg)

# 🏥 Health Tracker API Documentation

## 📑 API Endpoints Summary

| Method             | Endpoint                     | Description                       | Access | Score              |
| ------------------ | ---------------------------- | --------------------------------- | ------ | ------------------ |
| **Authentication** |                              |                                   |        |                    |
| [x] POST           | `/auth/register/doctor`      | ลงทะเบียนแพทย์                    | Public | 10                 |
| [x] POST            | `/auth/register/user`        | ลงทะเบียนผู้ป่วย                  | Public | 10                 |
| [x] POST            | `/auth/login/user`           | เข้าสู่ระบบผู้ป่วย                | Public | 10                 |
| [x] POST            | `/auth/login/doctor`         | เข้าสู่ระบบแพทย์                  | Public | 10                 |
| **Users**          |                              |                                   |        |
| [x] GET             | `/users/me`                  | ดูข้อมูลตัวเอง                    | User   | 10                 |
| [x] PATCH           | `/users/me`                  | แก้ไขข้อมูลตัวเอง                 | User   | 5+2 (authenticate) |
| **Doctor**         |                              |                                   |        |
| [x] GET             | `/doctors/me`                | ดูข้อมูลตัวเอง                    | Doctor | 10                 |
| [x] PATCH           | `/doctors/me`                | แก้ไขข้อมูลตัวเอง                 | Doctor | 5+2 (authenticate) |
| **Health Records** |                              |                                   |        |
| [x] POST            | `/health-records`            | สร้างบันทึกสุขภาพ                 | User   | 5+2 (authenticate) |
| [x] GET             | `/health-records`            | ดูบันทึกสุขภาพทั้งหมด             | User   | 8+2 (authenticate) |
| [x] GET             | `/health-records/:id`        | ดูบันทึกสุขภาพเฉพาะของไอดี        | User   | 8+2 (authenticate) |
| [x] PATCH           | `/health-records/:id`        | แก้ไขบันทึกสุขภาพ                 | User   | 5+2 (authenticate) |
| [x] DELETE          | `/health-records/:id`        | ลบบันทึกสุขภาพ                    | User   | 5+2 (authenticate) |
| **Doctor Notes**   |                              |                                   |        |
| [x] POST            | `/doctor-notes`              | สร้างบันทึกให้ผู้ป่วย             | Doctor | 5+2 (authenticate) |
| [x] GET             | `/doctor-notes/my-notes`     | ดูบันทึกที่เขียนทั้งหมด           | Doctor | 5+2 (authenticate) |
| [x] GET             | `/doctor-notes/user/:userId` | ดูบันทึกที่เขียนให้ผู้ป่วยคนหนึ่ง | Doctor | 8+2 (authenticate) |
| [x] GET             | `/doctor-notes/received`     | ดูบันทึกที่ได้รับจากหมอ           | User   | 5+2 (authenticate) |
| [x] PATCH           | `/doctor-notes/:id`          | แก้ไขบันทึก                       | Doctor | 5+2 (authenticate) |
| [x] DELETE          | `/doctor-notes/:id`          | ลบบันทึก                          | Doctor | 5+2 (authenticate) |

## Other Marks

Validation register 10 Marks

Error Middleware 5 Marks

NotFound Middleware 5 Marks

Prisma Schema 20 Marks

## 📝 Notes

1. ทุก protected route ต้องส่ง token ใน header:
   ```
   Authorization: Bearer <token>
   ```
2. Error responses จะมี HTTP status code ที่เหมาะสม

# CLAUDE.md

本文件為 Claude Code (claude.ai/code) 在此儲存庫中作業時的指引。

## 專案概述

本專案為 **2027 IEEE 國際奈微米工程與分子系統研討會 (IEEE NEMS 2027)** 的官方網站。

- **會議地點：** 國立清華大學 (NTHU)，台灣新竹
- **會議廳：** 旺宏館國際會議廳 (Macronix Building, International Conference Hall)

### 參考網站
- https://ieee-nems.org/2022/
- https://www.ieee-nems2024.org （主要視覺風格參考）

## 技術架構

- 純 HTML / CSS / JavaScript（靜態網站，不使用任何框架）
- 字型：Nunito（標題／導覽列）＋ Roboto（內文），透過 Google Fonts 載入
- 圖示：Font Awesome 6
- 視覺風格沿襲 IEEE NEMS 2024 的紫色主題（主色 `#6300E2`、hover 色 `#E2498A`）

## 專案結構

- `index.html` — 首頁
- `pages/` — 所有子頁面（welcome、committees、call-for-papers、venue 等）
- `assets/css/style.css` — 主要樣式表，使用 CSS 變數
- `assets/js/main.js` — 導覽列切換、手風琴、當前頁面高亮
- `assets/images/` — 橫幅、講者照片、贊助商 Logo

## 設計規範

- 遵循 IEEE NEMS 2024 視覺風格：紫色標題搭配 3px 底邊線，內容最大寬度 1000px
- 所有面向網站使用者的內容必須以**英文**撰寫
- 程式碼註解與開發者溝通使用**繁體中文**
- 頁首／頁尾／導覽列在每個 HTML 檔中皆為手動複製（無建置工具）

## 語言政策

- 所有面向網站使用者的內容（頁面、標題、選單）必須以**英文**撰寫
- 程式碼註解與開發者溝通使用**繁體中文**

// ฐานความรู้เลขศาสตร์ - จาก PDF "เลขศาสตร์"
// ตัวเลขที่กำหนดวิถีชีวิตของคุณ

const NUMEROLOGY_KNOWLEDGE = {
  // ตารางแปลงตัวอักษรไทยเป็นตัวเลข
  letterValues: {
    1: ['ก', 'ด', 'ถ', 'ท', 'ภ', 'ก่', 'กุ', 'กํา'],
    2: ['ข', 'ง', 'ช', 'บ', 'ป', 'เ', 'ก้', 'า'],
    3: ['ค', 'ฆ', 'ฑ', 'ฒ', 'ต', 'ก๋', 'ะ', 'แ'],
    4: ['ฉ', 'ญ', 'ธ', 'ษ', 'ฮ', 'กั', 'กิ'],
    5: ['จ', 'ฌ', 'ฎ', 'ณ', 'น', 'ม', 'ก๊'],
    6: ['ซ', 'ล', 'ว', 'อ', 'ใ', 'ห'],
    7: ['ผ', 'ศ', 'ส', 'อี', 'ก็', 'ฬ'],
    8: ['ฏ', 'ฝ', 'พ', 'ฟ', 'ย'],
    9: ['ฐ', 'ไ', 'อื', 'โ', 'อึ', 'ฤ', 'ะ', 'ฮ']
  },

  // ความหมายของเลข 1-10 และพิเศษ (11-19)
  numbers: {
    1: {
      planet: 'ดาวอาทิตย์',
      element: 'ไฟ',
      personality: 'ครอบงำ ชอบเป็นใหญ่ หยิ่งถือตัว มั่นคงไม่หวั่นไหว ชอบริเริ่ม มีบริวาร',
      career: 'นักปกครอง ผู้บริหาร ผู้นำ ไม่เหมาะเป็นศิลปิน ต้องเป็นพระเอกหรือตัวสำคัญ',
      strengths: 'กล้าตัดสินใจ เด็ดขาด ริเริ่มสร้างสรรค์',
      weaknesses: 'ว้าเหว่ ไม่สบอารมณ์ง่าย พลัดพราก เคลื่อนไหวไม่อยู่นิ่ง',
      colors: { good: ['ส้ม', 'ทอง'], bad: ['ฟ้า', 'น้ำเงิน', 'ขาว', 'ดำ', 'แดง'] },
      gems: ['พลอยสีส้ม', 'พลอยสีทอง', 'บุษราคัม'],
      compatible: [2, 5],
      enemy: [3],
      bodyPart: 'หัวใจ',
      animal: 'สิงโต'
    },
    
    2: {
      planet: 'ดาวจันทร์',
      element: 'น้ำ',
      personality: 'อ่อนไหวง่าย คิดฝัน จินตนาการสูง ชอบความละเอียดอ่อน คล้อยตามคนอื่น',
      career: 'นักแสดง นักพูด งานเบื้องหลัง เหมาะชอบเชิดคนอื่น',
      strengths: 'ควบคุมอารมณ์ได้ดี สติดี เสน่หม์ดึงดูดใจ',
      weaknesses: 'หูเบา เชื่อใจคนง่าย ดื้อรั้น',
      colors: { good: ['ขาว', 'นวล'], bad: ['ส้ม', 'ทอง', 'ม่วงคราม', 'เหลือง', 'น้ำตาล', 'ม่วง'] },
      gems: ['เพชร', 'ไข่มุก', 'พลอยสีขาว'],
      compatible: [4],
      enemy: [3, 7, 8, 9],
      bodyPart: 'เต้านม หน้าอก',
      animal: 'กระต่าย ม้า กวาง'
    },
    
    3: {
      planet: 'ดาวอังคาร',
      element: 'น้ำ (น้ำเลือด คลองขุ่น)',
      personality: 'กล้าแข็ง ขยัน กล้าแสดงความคิด มุทะลุ ทำตามใจตัวเอง โทสะจริต',
      career: 'ทหาร ตำรวจ วิศวกร ศัลยแพทย์ ทันตแพทย์ นักมวย',
      strengths: 'กระฉับกระเฉง กล้าหาญ เปิดเผย',
      weaknesses: 'อุบัติเหตุบ่อย ผ่าตัด ทะเลาะวิวาท ง่าย',
      colors: { good: ['ชมพู', 'ม่วงแดง'], bad: ['ขาว', 'นวล', 'ฟ้า', 'น้ำเงิน', 'แสด', 'ม่วง'] },
      gems: ['ทับทิม', 'พลอยสีแดง', 'พลอยม่วงแดง'],
      compatible: [6],
      enemy: [1],
      bodyPart: 'อวัยวะเพศ รังไข่ มดลูก',
      animal: 'เสือ หมูป่า กระทิง'
    },
    
    4: {
      planet: 'ดาวพุธ',
      element: 'ดิน',
      personality: 'ปัญญาไว เฉลียวฉลาด เจรจาเก่ง กลมกลืนได้ง่าย รวนเร มีทั้งดีและร้าย',
      career: 'นักพูด ทนายความ บุรุษไปรษณีย์ นักประพันธ์ นักร้อง โฆษณา',
      strengths: 'ปฏิภาณ เรียบร้อย อ่อนโยน เข้ากับใครได้ง่าย',
      weaknesses: 'รวนเร (พุธกลางคืนเป็นราหู-ร้าย)',
      colors: { good: ['เขียว'], bad: ['ชมพู', 'ม่วงแดง', 'ส้ม', 'ม่วงคราม', 'แสด'] },
      gems: ['มรกต', 'พลอยสีเขียว'],
      compatible: [2, 8],
      enemy: [3],
      bodyPart: 'ท้อง ลำไส้ กระเพาะอาหาร',
      animal: 'สุนัข ช้าง'
    },
    
    5: {
      planet: 'ดาวพฤหัส',
      element: 'ไฟ',
      personality: 'สติปัญญาแตกฉาน ยุติธรรม สุขุมเยือกเย็น ซื่อสัตย์ ดื้อรั้น',
      career: 'ศาสนา ครู อาจารย์ ผู้พิพากษา ผู้ใหญ่ ผู้ปกครอง',
      strengths: 'อุดมสมบูรณ์ ศึกษาหาความรู้ ความสำเร็จดี',
      weaknesses: 'ใจร้อน ดื้อรั้น',
      colors: { good: ['เหลือง', 'น้ำตาล'], bad: ['ดำ', 'เขียวอ่อน', 'ขาว', 'ชมพู'] },
      gems: ['บุษราคัม', 'พลอยสีเหลือง'],
      compatible: [1],
      enemy: [3, 7, 8],
      bodyPart: 'โคนขา วิญญาณ เลือด',
      animal: 'สัตว์ขนมาก หนู กระรอก กระแต'
    },
    
    6: {
      planet: 'ดาวศุกร์',
      element: 'ลม',
      personality: 'รักสวยรักงาม รสนิยมดี เสน่ห์ ชอบศิลปะ ดนตรี มองโลกในแง่ดี',
      career: 'ศิลปิน นางแบบ นักแสดง จิตรกร สถาปนิก นางงาม',
      strengths: 'มีเสน่ห์ สวยงาม น้ำใจดี ความคิดดี',
      weaknesses: 'อารมณ์อ่อนไหวง่าย',
      colors: { good: ['ฟ้า', 'น้ำเงิน'], bad: ['แดง', 'เขียวอ่อน', 'ดำ'] },
      gems: ['ไพลิน', 'พลอยสีฟ้า', 'เวกลงยา'],
      compatible: [3],
      enemy: [7, 8, 9],
      bodyPart: 'ท้อง หน้าท้อง ลำไส้ จมูก',
      animal: 'นกสีสวย หงส์ นกยูง ไก่ฟ้า'
    },
    
    7: {
      planet: 'ดาวเสาร์',
      element: 'ดิน',
      personality: 'อดทน สติดีเลิศ ผอมสูง ยากจน ขัดสน เดือดร้อน กำพร้า',
      career: 'กุลี กรรมกร คนแก่ คนชรา งานหนัก',
      strengths: 'อดทนมากที่สุด สติดี มีความสามารถ',
      weaknesses: 'ทุกข์โทษ ล่าช้า โรคภัย สูญเสีย ทรุดโทรม',
      colors: { good: ['ดำ', 'สีเข้ม', 'ม่วงคล้ำ'], bad: [] },
      gems: ['นิล', 'พลอยสีดำ', 'พลอยสีเข้ม'],
      compatible: [8],
      enemy: [3, 6],
      bodyPart: 'หัวเข่า โครงกระดูก',
      animal: 'งู สัตว์เลื้อยคลาน'
    },
    
    8: {
      planet: 'ดาวราหู เนปจูน',
      element: 'น้ำ (มหาสมุทร)',
      personality: 'ลุ่มหลง มัวเมา หูเบา ถูกใส่ร้าย มีคดี ชอบสังคม เลี้ยงดูคน',
      career: 'ทนายความ หมอแผนโบราณ นักไสยศาสตร์ ผู้แทนราษฎร',
      strengths: 'ใจคอกว้าง มีบริวารมาก ชอบจัดงาน',
      weaknesses: 'โมหะ วิบัติฉับพลัน ถูกกลั่นแกล้ง อับอาย',
      colors: { good: ['แดงเพลิง', 'แดงเข้ม'], bad: [] },
      gems: ['พลอยสีแดงเข้ม'],
      compatible: [7],
      enemy: [6, 4],
      bodyPart: 'คอ เท้า',
      animal: 'ปลาวาฬ ปลาฝูง โลมา'
    },
    
    9: {
      planet: 'ดาวเกตุ พลูโต',
      element: 'ไฟ',
      personality: 'ศักดิ์สิทธิ์ อำนาจ แคล้วคลาด ชอบของเก่า ศรัทธาในสิ่งลับ กำพร้าพ่อ',
      career: 'แพทย์ หมอโบราณ โหราศาสตร์ นักจิตศาสตร์ วิปัสสนา',
      strengths: 'โชคดี ส่งเสริมผู้อื่น 2 เท่า ค้นคว้าหาความรู้',
      weaknesses: 'อุบัติเหตุง่าย ปัญหาบุตร ยุ่งยาก',
      colors: { good: ['แสด'], bad: ['เขียว', 'ชมพู', 'แดง'] },
      gems: ['โกเมน'],
      compatible: [9],
      enemy: 'ตัวเอง (ขึ้นกับสภาพ)',
      bodyPart: 'ศีรษะ แขน',
      animal: 'แกะ แพะ เลียงผา'
    },
    
    10: {
      personality: 'มั่นใจสูง ทะเยอทะยาน ไม่ซ้ำใคร ถือเกียรติ กล้าตัดสินใจ',
      strengths: 'แหวกแนว กล้าได้กล้าเสีย',
      weaknesses: 'อุปสรรคมาก ศัตรูรอบด้าน ดื้อรั้น อาภัพ บริวารให้โทษ',
      note: 'เลข 1+0 ดาวศัตรูอยู่ด้วยกัน ชีวิตระทมทุกข์ ภาระหนัก'
    },
    
    11: {
      personality: 'อ่อนนอกแข็งใน ซ่อนบุคลิก คนสองหน้า อวดอ้าง',
      strengths: 'แข็งกร้าว เด็ดเดี่ยว',
      weaknesses: 'รวนเร หูเบา ดื้อรั้นสุดๆ ต้องสร้างชีวิตเอง อาฆาต',
      note: 'เลข 1+1 (=2 จันทร์) ทะเยอทะยานสูง ฝันร้อน'
    },
    
    12: {
      personality: 'อารมณ์ขัดแย้ง หยิ่ง+อ่อนไหว กล้าแข็ง',
      weaknesses: 'หูเบา เชื่อง่าย บุ่มบ่าม อุบัติเหตุ ผ่าตัด ขึ้นลง ถูกใส่ร้าย',
      note: 'เลข 1+2=3 อังคาร +8 ราหู อันตราย'
    },
    
    13: {
      personality: 'ดีและร้ายฉับพลัน แปลกแหวกแนว',
      weaknesses: 'อุบัติเหตุรุนแรง ผ่าตัด รถคว่ำ ถูกอาวุธ ครอบครัวแตกร้าว สายตาเสีย',
      note: 'เลข 1+3 คู่ศัตรู อันตรายมาก'
    },
    
    14: {
      personality: 'มันสมองเฉียบแหลม ว่องไว จำดี สุขุมรอบคอบ',
      strengths: 'เลขดาวจักรพรรดิ ความสำเร็จยอดเยี่ยม ปัญญาดี ยุติธรรม',
      weaknesses: 'เจ้าระเบียบ จู้จี้ ชอบสอน',
      note: 'เลข 1+4=5 พฤหัส เลขดีมาก'
    },
    
    15: {
      personality: 'เสน่ห์ ปฏิภาณ เข้าได้กับทุกคน อ่านใจเก่ง',
      strengths: 'นักพูดขั้นดี ดึงดูดใจ รสนิยมศิลปะ มองโลกในแง่ดี มิตรมาก',
      weaknesses: 'หูเบา เชื่อง่าย ขี้สงสาร ถูกหลอก',
      note: 'เลข 1+5=6 ศุกร์ เหมาะนักบริหาร'
    },
    
    16: {
      strengths: 'เลขมหามงคล สำเร็จผาดโผน มีชื่อเสียงอำนาจ',
      weaknesses: 'โชคร้ายก่อนสำเร็จ ฟันฝ่าอุปสรรคนาน ศัตรูมาก แพ้ศัตรู อันตรายในบั้นปลาย',
      note: 'เลข 1+6=7 เสาร์ ดี+ร้าย ระวังยามรุ่งโรจน์'
    },
    
    17: {
      personality: 'สติปัญญาแตกฉาน หยั่งรู้เหตุการณ์ล่วงหน้า',
      weaknesses: 'ผู้ใหญ่ให้โทษ ขึ้นลง ตกจากตำแหน่ง สตรี=อาภัพรัก แต่งงานช้า ไร้คู่ พ่อหม้าย',
      note: 'เลข 1+7=8 ราหู ไม่เหมาะสตรี'
    },
    
    18: {
      weaknesses: 'รุ่งเรืองแล้วตกต่ำ ขึ้นลง โยกย้ายบ่อย ถูกกดขี่ ศัตรูลับ ครอบครัวแตกร้าว พลัดพราก',
      note: 'เลข 1+8 ราหูทำลายอาทิตย์ ไม่เหมาะงานเสี่ยง ไม่เหมาะสตรี'
    },
    
    19: {
      strengths: 'เลขนำโชคอันดับ 1 สำเร็จงดงาม เกียรติสูง ผู้ใหญ่คุ้มครอง',
      weaknesses: 'ไม่เหมาะสตรี=หม้าย กำพร้าพ่อก่อนแม่ สามีตกตำแหน่ง เมียน้อย',
      note: 'เลข 1+9=10=1 พฤหัส ธาตุไฟ'
    }
  },

  // วันเกิดกับการตั้งชื่อ (โหราศาสตร์ไทย)
  birthDayNaming: {
    sunday: {
      letters: 'สระทุกตัว',
      forbidden: ['ศ', 'ษ', 'ส', 'ห', 'ฬ', 'อ', 'ฮ'],
      types: {
        boriwan: 'บริวาร',
        ayu: 'อายุ (ความสุข)',
        det: 'เดช (อำนาจ เกียรติยศ)',
        sri: 'ศรี (ทรัพย์สิน)',
        mula: 'มูละ (บ้านเรือน)',
        utsaha: 'อุตสาหะ (ขยัน)',
        montri: 'มนตรี (ผู้อุปถัมภ์)',
        kalakin: 'กาลกิณี (วิบัติ)'
      }
    },
    monday: {
      letters: 'ก ข ค ฆ ง',
      forbidden: ['อะ', 'อา', 'อิ', 'อี', 'อุ', 'อู', 'เอ', 'โอ']
    },
    tuesday: {
      letters: 'จ ฉ ช ฌ ญ',
      forbidden: ['ก', 'ข', 'ค', 'ฆ', 'ง']
    },
    wednesday: {
      letters: 'ฏ ฐ ฑ ฒ ณ ฎ',
      forbidden: ['จ', 'ฉ', 'ช', 'ฌ', 'ญ']
    },
    thursday: {
      letters: 'บ ป ผ พ ภ ม ฝ ฟ',
      forbidden: ['ด', 'ต', 'ถ', 'ท', 'ธ', 'น']
    },
    friday: {
      letters: 'ส ษ ศ ห ฬ อ ฮ',
      forbidden: ['ย', 'ร', 'ล', 'ว']
    },
    saturday: {
      letters: 'ต ถ ท ธ น ด',
      forbidden: ['ฎ', 'ฏ', 'ฐ', 'ฑ', 'ฒ', 'ณ']
    },
    wednesdayNight: {
      letters: 'ย ร ล ว',
      forbidden: ['บ', 'ป', 'ผ', 'พ', 'ภ', 'ม', 'ฝ', 'ฟ']
    }
  },

  // เลขที่ดีสำหรับชื่อ
  goodNumbers: {
    excellent: [6, 7, 9], // ยอดเยี่ยมสุด
    veryGood: [10, 11], // ดีมากสำหรับธุรกิจ
    good: [15, 18, 19, 24, 27, 36, 42, 44, 45, 46, 51, 54, 55, 56, 59, 60, 62, 63, 65, 90, 95, 97, 98, 99, 100],
    finalDigits: [6, 7, 8, 9, 10, 11] // เมื่อรวมให้เหลือหลักเดียว
  },

  // คำแนะนำตามอาชีพ
  careerGuide: {
    fame: 'ชื่อเสียง นักแสดง ศิลปิน → เลข 6 หรือ 7',
    business: 'ธุรกิจ การค้า การลงทุน → เลข 9, 10, 11',
    stable: 'ความมั่นคง ราชการ → เลข 5, 6, 7'
  },

  // กฎเกณฑ์การทำนาย
  rules: [
    'ต้องมีสัจจะ',
    'มีใจบริสุทธิ์',
    'ไม่อคติ ไม่ริษยา',
    'ห้ามทำนายเด็กอายุต่ำกว่า 15 ปี',
    'ห้ามทำนายผัวเมียให้แตกแยก',
    'ห้ามทำนายวันตาย'
  ]
};

// ฟังก์ชันคำนวณค่าเลขจากชื่อ
function calculateNameValue(name) {
  let total = 0;
  const letters = name.split('');
  
  for (const letter of letters) {
    for (const [value, chars] of Object.entries(NUMEROLOGY_KNOWLEDGE.letterValues)) {
      if (chars.includes(letter)) {
        total += parseInt(value);
        break;
      }
    }
  }
  
  return total;
}

// ฟังก์ชันรวมเลขให้เหลือหลักเดียว
function reduceToSingleDigit(number) {
  while (number > 11) {
    const digits = number.toString().split('');
    number = digits.reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return number;
}

// ฟังก์ชันวิเคราะห์ชื่อ
function analyzeNumerology(firstName, lastName) {
  const firstValue = calculateNameValue(firstName);
  const lastValue = calculateNameValue(lastName);
  const total = firstValue + lastValue;
  const finalNumber = reduceToSingleDigit(total);
  
  const numberInfo = NUMEROLOGY_KNOWLEDGE.numbers[finalNumber];
  
  return {
    firstName: firstName,
    firstNameValue: firstValue,
    lastName: lastName,
    lastNameValue: lastValue,
    totalValue: total,
    finalNumber: finalNumber,
    meaning: numberInfo,
    isGoodNumber: NUMEROLOGY_KNOWLEDGE.goodNumbers.excellent.includes(finalNumber) ||
                   NUMEROLOGY_KNOWLEDGE.goodNumbers.veryGood.includes(finalNumber)
  };
}

// ฟังก์ชันแนะนำชื่อตามอาชีพ
function suggestNumberByCareer(career) {
  if (career.includes('ธุรกิจ') || career.includes('การค้า') || career.includes('ลงทุน')) {
    return [9, 10, 11];
  } else if (career.includes('ศิลปิน') || career.includes('นักแสดง') || career.includes('ชื่อเสียง')) {
    return [6, 7];
  } else {
    return [5, 6, 7];
  }
}

// ฟังก์ชันตรวจสอบอักษรห้ามใช้ตามวันเกิด
function checkForbiddenLetters(name, birthDay) {
  const dayRules = NUMEROLOGY_KNOWLEDGE.birthDayNaming[birthDay];
  if (!dayRules) return { isValid: true, forbiddenFound: [] };
  
  const forbiddenFound = [];
  for (const letter of name.split('')) {
    if (dayRules.forbidden && dayRules.forbidden.includes(letter)) {
      forbiddenFound.push(letter);
    }
  }
  
  return {
    isValid: forbiddenFound.length === 0,
    forbiddenFound: forbiddenFound,
    allowedLetters: dayRules.letters
  };
}

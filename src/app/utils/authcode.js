/* eslint-disable */
import md5 from '@/utils/md5.min'
export default (str, operation, key, expiry) => {
  var operation = operation ? operation : 'DECODE'
  var key = key ? key : ''
  var expiry = expiry ? expiry : 0

  var ckey_length = 4
  key = md5(key)

  // 密匙a会参与加解密
  var keya = md5(key.substr(0, 16))
  // 密匙b会用来做数据完整性验证
  var keyb = md5(key.substr(16, 16))
  // 密匙c用于变化生成的密文
  // IE下不支持substr第一个参数为负数的情况
  if (ckey_length) {
    if (operation == 'DECODE') {
      var keyc = str.substr(0, ckey_length)
    } else {
      var md5_time = md5(microtime())
      var start = md5_time.length - ckey_length
      var keyc = md5_time.substr(start, ckey_length)
    }
  } else {
    var keyc = ''
  }
  // 参与运算的密匙
  var cryptkey = keya + md5(keya + keyc)

  var strbuf

  if (operation == 'DECODE') {
    str = str.substr(ckey_length)
    strbuf = atob(str)
    //string = b.toString();
  } else {
    expiry = expiry ? expiry + time() : 0
    tmpstr = expiry.toString()
    if (tmpstr.length >= 10) str = tmpstr.substr(0, 10) + md5(str + keyb).substr(0, 16) + str
    else {
      var count = 10 - tmpstr.length
      for (var i = 0; i < count; i++) {
        tmpstr = '0' + tmpstr
      }
      str = tmpstr + md5(str + keyb).substr(0, 16) + str
    }
    strbuf = str
  }

  var box = new Array(256)
  for (var i = 0; i < 256; i++) {
    box[i] = i
  }
  var rndkey = new Array()
  // 产生密匙簿
  for (var i = 0; i < 256; i++) {
    rndkey[i] = cryptkey.charCodeAt(i % cryptkey.length)
  }
  // 用固定的算法，打乱密匙簿，增加随机性，好像很复杂，实际上对并不会增加密文的强度
  for (var j = (i = 0); i < 256; i++) {
    j = (j + box[i] + rndkey[i]) % 256
    const tmp = box[i]
    box[i] = box[j]
    box[j] = tmp
  }

  // 核心加解密部分
  var s = ''
  //IE下不支持直接通过下标访问字符串的字符，需要先转换为数组
  strbuf = strbuf.split('')
  for (var a = (j = i = 0); i < strbuf.length; i++) {
    a = (a + 1) % 256
    j = (j + box[a]) % 256
    const tmp = box[a]
    box[a] = box[j]
    box[j] = tmp
    // 从密匙簿得出密匙进行异或，再转成字符
    s += chr(ord(strbuf[i]) ^ box[(box[a] + box[j]) % 256])
  }

  if (operation == 'DECODE') {
    if ((s.substr(0, 10) == 0 || s.substr(0, 10) - time() > 0) && s.substr(10, 16) == md5(s.substr(26) + keyb).substr(0, 16)) {
      s = s.substr(26)
    } else {
      s = ''
    }
  } else {
    s = btoa(s)
    var regex = new RegExp('=', 'g')
    s = s.replace(regex, '')
    s = keyc + s
  }

  return s
}

function time() {
  var unixtime_ms = new Date().getTime()
  return parseInt(unixtime_ms / 1000)
}

function microtime(get_as_float) {
  var unixtime_ms = new Date().getTime()
  var sec = parseInt(unixtime_ms / 1000)
  return get_as_float ? unixtime_ms / 1000 : (unixtime_ms - sec * 1000) / 1000 + ' ' + sec
}
function chr(s) {
  return String.fromCharCode(s)
}
function ord(s) {
  return s.charCodeAt()
}

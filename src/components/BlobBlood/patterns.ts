// https://lokesh-coder.github.io/blobs.app/?e=11&gw=4&se=5&g=780606|bb0a1e&o=0
export const PATTERNS = [
  'M367.5,284Q356,318,348.5,383.5Q341,449,284.5,425.5Q228,402,178.5,396Q129,390,137.5,335.5Q146,281,99.5,236.5Q53,192,81.5,140Q110,88,165,63Q220,38,261.5,86.5Q303,135,360,139Q417,143,398,196.5Q379,250,367.5,284Z',
  'M398.5,293.5Q386,337,365,396Q344,455,281,463.5Q218,472,156.5,450.5Q95,429,109.5,358Q124,287,115.5,247.5Q107,208,106.5,145.5Q106,83,161.5,53.5Q217,24,261.5,76Q306,128,369.5,130Q433,132,422,191Q411,250,398.5,293.5Z',
  'M410.5,314Q449,378,387.5,396.5Q326,415,273.5,432.5Q221,450,179.5,414.5Q138,379,139.5,330.5Q141,282,119.5,243.5Q98,205,124,170Q150,135,190.5,125.5Q231,116,270.5,117.5Q310,119,323.5,156.5Q337,194,354.5,222Q372,250,410.5,314Z',
  'M424.69033,303.35725Q415.55137,356.71451,382.93882,413.22432Q350.32628,469.73412,291.23791,420.84366Q232.14954,371.95319,173.41843,388.65333Q114.68732,405.35347,65.50757,361.92144Q16.32783,318.48942,43.48038,257.69033Q70.63294,196.89124,96.63294,150.2349Q122.63294,103.57856,177.32327,115.87085Q232.01359,128.16314,275.06118,114.45922Q318.10876,100.75529,326.03399,148.39124Q333.95922,196.02719,383.89425,223.01359Q433.82929,250,424.69033,303.35725Z',
  'M445,313Q445,376,385,395Q325,414,279,392.5Q233,371,191.5,368Q150,365,106,335Q62,305,93,259Q124,213,120.5,154.5Q117,96,169,70.5Q221,45,260,94Q299,143,351.5,147Q404,151,424.5,200.5Q445,250,445,313Z',
  'M467.5,310Q437,370,380,390.5Q323,411,274,419Q225,427,188.5,395Q152,363,149,322Q146,281,126,244.5Q106,208,143,188.5Q180,169,204,132.5Q228,96,265,116Q302,136,369.5,133Q437,130,467.5,190Q498,250,467.5,310Z',
  'M387,302Q412,354,364.5,375.5Q317,397,276,375Q235,353,204.5,345Q174,337,150,311.5Q126,286,140,254Q154,222,145,170Q136,118,178.5,84Q221,50,283,46.5Q345,43,383.5,91.5Q422,140,392,195Q362,250,387,302Z',
  'M420.15418,297.78995Q399.36984,345.57989,352.39609,358.65978Q305.42235,371.73968,267.57989,382.89385Q229.73743,394.04803,179.76593,391.31059Q129.79443,388.57316,100.53187,345.70669Q71.2693,302.84022,67.37657,249.26369Q63.48384,195.68716,88.69053,144.21342Q113.89722,92.73968,166.39609,61.37096Q218.89497,30.00224,270.36984,61.23519Q321.8447,92.46813,353.50337,127.81172Q385.16203,163.1553,413.05027,206.57765Q440.93851,250,420.15418,297.78995Z',
  'M428.5,288Q368,326,359.5,398.5Q351,471,287.5,452Q224,433,195,390Q166,347,159.5,312.5Q153,278,83,229Q13,180,81,156.5Q149,133,183,75Q217,17,264,67Q311,117,344.5,142.5Q378,168,433.5,209Q489,250,428.5,288Z',
  'M442.5,299.5Q404,349,363.5,379.5Q323,410,275.5,405.5Q228,401,177.5,396.5Q127,392,70,355.5Q13,319,43,258.5Q73,198,122.5,179Q172,160,195,94Q218,28,270.5,58.5Q323,89,371.5,115Q420,141,450.5,195.5Q481,250,442.5,299.5Z',
  'M405,291Q377,332,352.5,376.5Q328,421,273,446Q218,471,188.5,413Q159,355,96,334.5Q33,314,35,250.5Q37,187,102.5,171Q168,155,196.5,117.5Q225,80,275.5,82.5Q326,85,338,135Q350,185,391.5,217.5Q433,250,405,291Z',
  'M476.78788,314.57996Q451.40787,379.15992,389.70394,400.07996Q328,421,276.66799,422.42004Q225.33599,423.84008,189.024,393.08803Q152.71201,362.33599,92.33201,338.16799Q31.952,314,35.524,251.024Q39.096,188.048,85.73203,151.61203Q132.36806,115.17607,177.63603,86.58405Q222.904,57.99204,278.64399,61.54004Q334.38399,65.08803,352.14798,118.75603Q369.91197,172.42402,436.03992,211.21201Q502.16788,250,476.78788,314.57996Z',
  'M451.9234,317.18381Q458.52517,384.36762,396.42014,408.99891Q334.3151,433.63021,284.39388,397.18707Q234.47266,360.74393,187.94748,367.68707Q141.42231,374.63021,79.34353,346.42014Q17.26476,318.21007,56.55035,261.52517Q95.83593,204.84028,109.12912,154.07878Q122.42231,103.31728,173.23741,85.89497Q224.05252,68.47266,289.02517,46.18598Q353.99783,23.89931,389.39062,80.55686Q424.78342,137.21441,435.05252,193.60721Q445.32162,250,451.9234,317.18381Z',
  'M404.66445,299.37766Q403.62251,348.75533,360.25183,372.24834Q316.88116,395.74135,270.40563,412.09437Q223.93009,428.4474,191.52447,392.16078Q159.11884,355.87417,100.64331,333.41262Q42.16777,310.95107,49.96155,252.44058Q57.75533,193.93009,86.3497,143.93009Q114.94408,93.93009,170.47903,88.51748Q226.01398,83.10486,269.87067,96.84604Q313.72737,110.58721,350.74484,135.8705Q387.76232,161.15379,396.73436,205.5769Q405.70639,250,404.66445,299.37766Z',
  'M446.72561,309.40983Q435.29421,368.81967,370.40983,369.89215Q305.52546,370.96463,267.37058,382.2705Q229.2157,393.57637,168.55091,403.99611Q107.88612,414.41586,69.72736,364.27264Q31.5686,314.12942,81.81578,264.49611Q132.06296,214.86281,136.57074,170.07851Q141.07851,125.29421,179.36669,75.46075Q217.65488,25.62728,271.04314,56.86067Q324.4314,88.09405,388.55305,104.20579Q452.6747,120.31753,455.41586,185.15876Q458.15702,250,446.72561,309.40983Z',
  'M409.5,282.5Q351,315,349.5,389.5Q348,464,290,418Q232,372,163.5,400.5Q95,429,79.5,367Q64,305,82.5,255.5Q101,206,104.5,146Q108,86,170,106.5Q232,127,264,138Q296,149,319,170Q342,191,405,220.5Q468,250,409.5,282.5Z',
  'M379.5,289Q372,328,348.5,371.5Q325,415,274.5,422Q224,429,186,398Q148,367,107.5,335.5Q67,304,50.5,245.5Q34,187,71,136.5Q108,86,164.5,66Q221,46,272,68.5Q323,91,328.5,143.5Q334,196,360.5,223Q387,250,379.5,289Z',
  'M410.54899,296.27711Q394.31646,342.55422,346.55944,349.66868Q298.80241,356.78314,264.31205,373.48595Q229.82169,390.18876,161.25783,410.61365Q92.69398,431.03855,88.09438,365.09357Q83.49478,299.14859,64.56907,244.52972Q45.64337,189.91084,90.89076,153.96506Q136.13815,118.01927,181.96506,106.7518Q227.79197,95.48433,274.4257,95.18273Q321.05944,94.88112,328.5,144.95542Q335.94056,195.02972,381.36104,222.51486Q426.78152,250,410.54899,296.27711Z',
  'M364.37059,287.88495Q368.64807,325.76989,351.56768,379.91284Q334.48728,434.05578,279.7098,430.78507Q224.93232,427.51436,158.9797,429.24364Q93.02707,430.97293,95.10152,362.95939Q97.17596,294.94586,122.26477,257.67596Q147.35357,220.40607,141.16325,168.6895Q134.97293,116.97293,180.47293,100.39848Q225.97293,83.82404,265.37818,106.64212Q304.78343,129.46021,330.52707,155.64212Q356.27071,181.82404,358.18191,215.91202Q360.09311,250,364.37059,287.88495Z',
  'M448,301Q409,352,365,379Q321,406,272.5,418.5Q224,431,163,426Q102,421,98,358.5Q94,296,118.5,257Q143,218,144.5,174Q146,130,186,107.5Q226,85,260.5,118.5Q295,152,333.5,162Q372,172,429.5,211Q487,250,448,301Z',
];

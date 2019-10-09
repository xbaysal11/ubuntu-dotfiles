import imaplib
gmail=''
passwd=''
obj = imaplib.IMAP4_SSL('imap.gmail.com',993)
obj.login(gmail,passwd)
obj.select()
number = len(obj.search(None, 'UnSeen')[1][0].split())
if number>0:
    print(number)
else:
    print('')

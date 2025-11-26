import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send calculator form data via email
    Args: event - dict with httpMethod, body containing calculator data
          context - object with attributes: request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Request-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    calculator_type = body_data.get('calculatorType', 'не указан')
    phone = body_data.get('phone', '')
    name = body_data.get('name', '')
    email = body_data.get('email', 'не указан')
    details = body_data.get('details', {})
    price = body_data.get('price', 0)
    
    if not phone or not name:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Name and phone are required'}),
            'isBase64Encoded': False
        }
    
    email_from = 'ragrafika.info@mail.ru'
    email_to = 'ragrafika.info@mail.ru'
    email_password = os.environ.get('EMAIL_PASSWORD', '')
    
    if not email_password:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'EMAIL_PASSWORD not configured'}),
            'isBase64Encoded': False
        }
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка: {calculator_type}'
    msg['From'] = email_from
    msg['To'] = email_to
    
    html_details = '<br>'.join([f'<strong>{k}:</strong> {v}' for k, v in details.items()])
    
    html_content = f'''
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2563eb;">Новая заявка с калькулятора</h2>
        <p><strong>Тип калькулятора:</strong> {calculator_type}</p>
        <p><strong>Имя клиента:</strong> {name}</p>
        <p><strong>Телефон:</strong> {phone}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Рассчитанная стоимость:</strong> {price:,} ₽</p>
        <h3 style="color: #2563eb; margin-top: 20px;">Детали расчёта:</h3>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 5px;">
          {html_details}
        </div>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">Заявка отправлена автоматически с сайта ragrafika.ru</p>
      </body>
    </html>
    '''
    
    part = MIMEText(html_content, 'html', 'utf-8')
    msg.attach(part)
    
    smtp_server = 'smtp.mail.ru'
    smtp_port = 587
    
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(email_from, email_password)
        server.send_message(msg)
        server.quit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'message': 'Email sent successfully'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Failed to send email: {str(e)}'}),
            'isBase64Encoded': False
        }
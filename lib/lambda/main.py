import json

def lambda_handler(event, context):
    print('request: {}'.format(json.dumps(event)))
    r = requests.get('http://example.com/api')
    print(f"res is {r}",)
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/plain'
        },
        'body': 'Hello, CDK! You have hit'
    }
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "https://loan-management-system-frontend.vercel.app"}})

# Loan evaluation logic
def evaluate_loan(data):
    name = data['name']
    salary = int(data['salary'])
    credit_score = int(data['creditScore'])
    debt = int(data['debt'])
    loan_amount = int(data['loanAmount'])
    tenure = int(data['tenure'])

    # Debt-to-Income Ratio (DTI)
    dti = (debt / salary) * 100
    if dti > 40:
        return f"Rejected: High Debt-to-Income Ratio ({dti:.2f}%) for {name}."

    # Credit Score Evaluation
    if credit_score < 600:
        return f"Rejected: Low Credit Score ({credit_score}) for {name}."
    elif credit_score >= 600 and credit_score <= 700:
        interest_rate = "10%"
    else:
        interest_rate = "7%"

    # Salary Banding
    if salary < 30000:
        return f"Rejected: Low Salary Band for {name}."
    elif salary >= 30000 and salary < 60000:
        salary_band = "Medium Income"
    else:
        salary_band = "High Income"

    # Loan Tenure
    if tenure > 10:
        return f"Rejected: Loan Tenure ({tenure} years) too long for {name}."
    
    # Final Approval
    return f"Approved: {name} qualifies for the loan. Interest Rate: {interest_rate}. Salary Band: {salary_band}. DTI: {dti:.2f}%."

@app.route('/api/evaluate-loan', methods=['POST'])
def evaluate():
    data = request.json
    result = evaluate_loan(data)
    return jsonify({"status": result})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
